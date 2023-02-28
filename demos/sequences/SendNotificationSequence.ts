import { Sequence } from '../../lib'
import {
  SendAppNotificationAction,
  SendEmailAction,
} from '../actions'
import { Message } from '../types'

interface Props {
  message: Message
}

export class SendNotificationSequence extends Sequence<Props, Props> {
  protected actions = [
    SendEmailAction,
    SendAppNotificationAction
  ]
}

export default SendNotificationSequence.method<Props, Props>()
