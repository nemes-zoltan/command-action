import Command, { ForcedActionError } from '../../lib'
import { PlaceOrderProps, PlaceOrderResult, placeOrderSequence } from '../sequences'
import { user, products } from '../data'

async function main() {
  try {
    await Command.runWithProvider<PlaceOrderProps, PlaceOrderResult>(
      placeOrderSequence,
      { products, failAtShippingCheck: true },
      { user }
    )
  } catch(error) {
    if (error instanceof ForcedActionError) {
      console.log(`Interactor was force failed with message: ${error.message}`)
    }
  }
}

main()
