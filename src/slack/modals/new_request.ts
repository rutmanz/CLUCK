import { Blocks, Elements, Message } from 'slack-block-builder'
import { formatDuration, sanitizeCodeblock } from '~slack/lib/messages'
import { ActionIDs } from '~slack/handlers'

export function getHourSubmissionMessage(v: { request_id: string; slack_id: string; hours: number; activity: string }) {
    //prettier-ignore
    return Message()
        .text(`<@${v.slack_id}> submitted ${formatDuration(v.hours)} for ${v.activity}`)
        .blocks(
            Blocks.Header().text("Time Submission"),
            Blocks.Section().text(`>>>*<@${v.slack_id}>* submitted *${formatDuration(v.hours)}* for activity\n\`${sanitizeCodeblock(v.activity)}\``),
            Blocks.Actions()
                .elements(
                    Elements.Button()
                        .primary()
                        .text("Accept")
                        .actionId(ActionIDs.ACCEPT)
                        .value(v.request_id),
                    Elements.Button()
                        .text("Accept Summer ☀️")
                        .actionId(ActionIDs.ACCEPT_SUMMER)
                        .value(v.request_id),
                    Elements.Button()
                        .text("Accept Event 📆")
                        .actionId(ActionIDs.ACCEPT_EVENT)
                        .value(v.request_id),
                    Elements.Button()
                        .text("Accept w/ Message")
                        .actionId(ActionIDs.ACCEPT_WITH_MSG)
                        .value(v.request_id),
                    Elements.Button()
                        .danger()
                        .text("Reject")
                        .actionId(ActionIDs.REJECT)
                        .value(v.request_id)
                ),
            Blocks.Divider(),
        ).buildToObject()
}
