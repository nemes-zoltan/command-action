import { Action } from '../../lib'
import { Message, PlaceOrderProvider } from '../types'

interface Props {
  message: Message
}

export class SendEmailAction extends Action<Props, Props, PlaceOrderProvider> {
  protected async run() {
    console.log(`Sending email titled ${this.context.message.title} to "${this.provider.user.email}"`)
  }
}
