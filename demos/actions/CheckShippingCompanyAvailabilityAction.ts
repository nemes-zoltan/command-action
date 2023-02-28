import { Action } from '../../lib'

export class CheckShippingCompanyAvailabilityAction extends Action {
  protected async run() {
    console.log('No Shipping companies available failing entire flow...')

    this.context.fail({ message: 'No Shipping companies available', force: true })
  }
}

export default CheckShippingCompanyAvailabilityAction.method()
