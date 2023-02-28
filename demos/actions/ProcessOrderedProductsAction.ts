import { Action } from '../../lib'
import { Order, Product } from '../types'

interface Props {
  order: Order
  products: Product[]
}

export class ProcessOrderedProductsAction extends Action<Props> {
  protected async run() {
    this.context.order.products = this.context.products
    console.log('Adding products to orders')
    this.context.products.forEach(product => {
      product.quantity--
      this.context.order.total += product.price
    })
    console.log('Decreased products quantity')
    console.log('Calculated total money')
  }
}
