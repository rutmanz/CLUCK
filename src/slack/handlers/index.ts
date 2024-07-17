import type { App } from '@slack/bolt'
import { getAcceptButtonHandler, handleAcceptWithMessageButton, handleSubmitAcceptModal } from './button/accept'
import { handleAppHomeOpened } from './view/app_home'
import { handleLogCommand, handleLogShortcut } from './cmd/log'
import { handleLogoutCommand } from './cmd/logout'
import { handleRejectButton, handleSubmitRejectModal } from './button/reject'
import { handleOpenUserInfoModal } from './view/userinfo'
import { handleVoidCommand } from './cmd/void'
import { handleGetLoggedInCommand } from './cmd/loggedin'
import config from '~config'
import { getPendingRequests } from '~slack/messages/pending_requests'
import { handleGraphCommand } from '~slack/handlers/graph'
import { handleShowHoursCommand, handleShowPendingHours } from '~slack/handlers/cmd/hours'
import { handleCertApprove, handleCertifyCommand, handleCertReject, handleSubmitCertifyModal } from '~slack/handlers/cmd/certify'
import { handleOpenLogModal, handleSubmitLogModal } from '~slack/handlers/view/log_modal'

export enum ActionIDs {
    ACCEPT = 'accept',
    ACCEPT_SUMMER = 'accept_summer',
    ACCEPT_EVENT = 'accept_event',
    ACCEPT_LAB = 'accept_lab',
    ACCEPT_WITH_MSG = 'accept_msg',
    REJECT = 'reject',
    OPEN_USERINFO_MODAL = 'open_settings_modal',
    OPEN_LOG_MODAL = 'open_log_modal',
    SHOW_PENDING_REQUESTS = 'show_pending_requests',
    SEND_PENDING_REQUESTS = 'send_pending_requests',
    CERT_APPROVE = 'cert_approve',
    CERT_REJECT = 'cert_reject'
}

export enum ViewIDs {
    MODAL_REJECT = 'reject_modal',
    MODAL_ACCEPT = 'accept_modal',
    MODAL_LOG = 'time_submission',
    MODAL_CERTIFY = 'certify_modal'
}

export function registerSlackHandlers(app: App) {
    // Commands and Shortcuts
    let cmd_prefix = '/'
    if (config.slack.app.command_prefix) {
        cmd_prefix += config.slack.app.command_prefix + '_'
    }
    app.command(cmd_prefix + 'log', handleLogCommand)
    app.command(cmd_prefix + 'graph', handleGraphCommand)
    app.command(cmd_prefix + 'clearlogin', handleLogoutCommand)
    app.command(cmd_prefix + 'voidtime', handleVoidCommand)
    app.command(cmd_prefix + 'loggedin', handleGetLoggedInCommand)
    app.command(cmd_prefix + 'hours', handleShowHoursCommand)
    app.command(cmd_prefix + 'certify', handleCertifyCommand)
    app.shortcut('log_hours', handleLogShortcut)
    //
    // // Buttons
    app.action(ActionIDs.ACCEPT, getAcceptButtonHandler('external'))
    app.action(ActionIDs.ACCEPT_SUMMER, getAcceptButtonHandler('summer'))
    app.action(ActionIDs.ACCEPT_EVENT, getAcceptButtonHandler('event'))
    app.action(ActionIDs.ACCEPT_LAB, getAcceptButtonHandler('lab'))
    app.action(ActionIDs.ACCEPT_WITH_MSG, handleAcceptWithMessageButton)
    app.action(ActionIDs.REJECT, handleRejectButton)
    app.action(ActionIDs.OPEN_USERINFO_MODAL, handleOpenUserInfoModal)
    app.action(ActionIDs.OPEN_LOG_MODAL, handleOpenLogModal)
    app.action(ActionIDs.CERT_REJECT, handleCertReject)
    app.action(ActionIDs.CERT_APPROVE, handleCertApprove)
    app.action(ActionIDs.SHOW_PENDING_REQUESTS, handleShowPendingHours)
    app.action(ActionIDs.SEND_PENDING_REQUESTS, async ({ ack, client }) => {
        await ack()
        const msg = await getPendingRequests()
        await client.chat.postMessage({
            ...msg,
            channel: config.slack.channels.approval
        })
    })
    app.action('jump_url', async ({ ack }) => {
        await ack()
    })

    // // Modals
    app.view(ViewIDs.MODAL_REJECT, handleSubmitRejectModal)
    app.view(ViewIDs.MODAL_ACCEPT, handleSubmitAcceptModal)
    app.view(ViewIDs.MODAL_LOG, handleSubmitLogModal)
    app.view(ViewIDs.MODAL_CERTIFY, handleSubmitCertifyModal)
    //
    // // Events
    app.event('app_home_opened', handleAppHomeOpened)
}
