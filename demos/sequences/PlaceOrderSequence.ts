import { Sequence } from '../../lib'
import {
  CreateOrderAction,
  ProcessOrderedProductsAction,
  MakePaymentAction,
  CreateOrderNotificationAction,
  NotifyShippingCompanyAction
} from '../actions'
import { SendNotificationSequence } from './SendNotificationSequence'
import { Order, Product } from '../types'

export interface Props {
  products: Product[]
  failAtPayment?: boolean
  failAtShippingCheck?: boolean
}

export interface Result extends Props {
  order: Order
}

export class PlaceOrderSequence extends Sequence<Props, Result> {
  protected actions = [
    CreateOrderAction,
    ProcessOrderedProductsAction,
    MakePaymentAction,
    CreateOrderNotificationAction,
    SendNotificationSequence,
    NotifyShippingCompanyAction
  ]
}

export default PlaceOrderSequence.method<Props, Result>()
