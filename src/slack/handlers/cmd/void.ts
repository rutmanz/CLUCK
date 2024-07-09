import type { SlackCommandMiddlewareArgs, AllMiddlewareArgs } from '@slack/bolt'
import type { WebClient } from '@slack/bolt' // I know this is stupid but bolt is running a major release behind for some reason
import config from '~config'
import { completeHourLog, HourError } from '~lib/hour_operations'
import prisma from '~lib/prisma'

export async function handleVoidCommand({ command, logger, ack, respond, client }: SlackCommandMiddlewareArgs & AllMiddlewareArgs) {
    await ack()
    const void_channel_members = (await client.conversations.members({ channel: config.slack.channels.void })).members!

    if (!void_channel_members.includes(command.user_id)) {
        await respond({ response_type: 'ephemeral', text: 'Must be a copresident to run this command' })
        return
    }

    try {
        const target_match = command.text.match(/<@([\w\d]+)\|.+>/)
        if (target_match == null) {
            await respond({
                response_type: 'ephemeral',
                text: `Please provide the user in the form of a mention (like <@${command.user_id}>)`
            })
            return
        }
        const target_id = target_match![1]

        if (void_channel_members.includes(target_id)) {
            await respond({
                response_type: 'ephemeral',
                text: `Target must not be in <#${config.slack.channels.void}>!`
            })
            return
        }
        const target_member = await prisma.member.findFirst({ where: { slack_id: target_id } })
        if (target_member == null) {
            await respond({ response_type: 'ephemeral', text: `Could not find user with id '${target_id}'` })
            return
        }
        const status = await completeHourLog(target_member.email, true)
        if (status.success) {
            await respond({ response_type: 'ephemeral', text: `Successfully voided hours for <@${target_id}>` })
            await client.chat.postMessage({
                channel: config.slack.channels.void,
                text: `<@${command.user_id}> has voided hours for <@${target_id}>`
            })
        } else if (status.error == HourError.NOT_SIGNED_IN) {
            await respond({ response_type: 'ephemeral', text: `<@${target_id}> is not logged in` })
        } else {
            await respond({
                response_type: 'ephemeral',
                text: `Could not void hours for $<@${target_id}>: ${status.error}`
            })
        }
    } catch (e) {
        logger.error(e)
        await respond({ response_type: 'ephemeral', text: `Could not parse arguments: ${e}` })
        return
    }
}
