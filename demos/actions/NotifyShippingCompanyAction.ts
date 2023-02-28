import { ActionHook, Action } from '../../lib'
import { Message } from '../types'
import checkShippingCompanyAvailabilityAction from './CheckShippingCompanyAvailabilityAction'

interface Props {
  message: Message
  failAtShippingCheck?: boolean
}

export class NotifyShippingCompanyAction extends Action<Props> {
  protected beforeHooks: ActionHook[] = [
    this.loadShippingComapnies.bind(this),
    this.findQuickestDeliveryOption.bind(this)
  ]

  protected async run() {
    console.log('Sending information to selected shipping company...')
    if (this.context.failAtShippingCheck) {
      await checkShippingCompanyAvailabilityAction({})
    }
  }
  
  private loadShippingComapnies() {
    console.log('Fetching all shipping companies...')
  }

  private findQuickestDeliveryOption() {
    console.log('Filtering best delivery company from available companies')
  }
}
