import { Action } from '../../lib'
import { Message, Order, PlaceOrderProvider } from '../types'

interface Props {
  order: Order
}

interface Result extends Props {
  message: Message
}

export class CreateOrderNotificationAction extends Action<Props, Result, PlaceOrderProvider> {
  protected async run() {
    const { order } = this.context
    const { user } = this.provider

    this.context.message = {
      title: `Order nr: #${order.timestamp}`,
      description: `
        Hello :wave: ${user.name},
        Your order with total: ${order.total} has been payed and on your way!
        Cheers
      `
    }
    console.log('Created message for Order', this.context.message)
  }
}
