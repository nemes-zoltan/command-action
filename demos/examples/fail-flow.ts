import Command from '../../lib'
import { PlaceOrderProps, PlaceOrderResult, placeOrderSequence } from '../sequences'
import { user, products } from '../data'
import { FailureType } from '../types'

async function main() {
  const context = await Command.runWithProvider<PlaceOrderProps, PlaceOrderResult>(
    placeOrderSequence,
    { products, failAtPayment: true },
    { user }
  )

  if (context.isFailure()) {
    console.log(`Something failed while placing your order with following message: "${context.failure('message')}"`)
  }

  if (context.isFailure(FailureType.PaymentFail)) {
    console.log('Failure seems to have to do with payments module...')
  }
}

main()
