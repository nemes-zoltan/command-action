import { Action } from '../../lib'
import { Order, PlaceOrderProvider, Product } from '../types'

interface Props {
  products: Product[]
}

interface Result extends Props {
  order: Order
}

export class CreateOrderAction extends Action<Props, Result, PlaceOrderProvider> {
  protected async run() {
    this.context.order = await this.createrOrder()
    console.log(`Created Order for ${this.provider.user.email}`, this.context.order)
  }

  private async createrOrder(): Promise<Order> {
    return {
      name: `${this.provider.user.name}'s Order`,
      timestamp: Date.now().toString(),
      products: this.context.products,
      total: 0
    }
  }
}
