import { Product, User } from './types'

export const user: User = {
  email: 'demo@mail.com',
  name: 'Demo User',
  creditCard: '123456789'
}

export const products: Product[] = [
  {
    name: 'Product 1',
    quantity: 5,
    price: 5
  },
  {
    name: 'Product 2',
    quantity: 6,
    price: 7
  }
]
