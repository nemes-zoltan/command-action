import { Action, ActionHook } from '../../lib'
import { FailureType, Order, PlaceOrderProvider } from '../types'

interface Props {
  order: Order
  failAtPayment?: boolean
}

export class MakePaymentAction extends Action<Props, Props, PlaceOrderProvider> {
  protected beforeHooks: ActionHook[] = [
    this.setupPaymentConnection.bind(this)
  ]

  protected async run() {
    if (this.context.failAtPayment) {
      this.context.fail({
        message: 'There seems to be an issue with the payment',
        type: FailureType.PaymentFail
      })
    }

    console.log(`Extracting funds ${this.context.order.total}$ from ${this.provider.user.creditCard} card`)
  }
  
  public rollback() {
    console.log('Rollingback payment... closing payment connection!')
  }

  private setupPaymentConnection() {
    console.log('Setting up payment connection...')
  }
}
