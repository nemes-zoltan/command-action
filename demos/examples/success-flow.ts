import Command from '../../lib'
import { placeOrderSequence } from '../sequences'
import { user, products } from '../data'

async function main() {
  const context = await Command.runWithProvider(
    placeOrderSequence,
    { products },
    { user }
  )

  if (context.isSuccess()) {
    console.log('Congratulations your order has been placed and under way!')
  }
}

main()
