import { Action } from '../../lib'
import { Message, PlaceOrderProvider } from '../types'

interface Props {
  message: Message
}

export class SendAppNotificationAction extends Action<Props, Props, PlaceOrderProvider> {
  protected async run() {
    console.log(`Sending App notification to authenticated user ${this.provider.user.name} with title ${this.context.message.title}`)
  }
}
