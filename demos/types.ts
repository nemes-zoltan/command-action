export interface User {
  name: string
  email: string
  creditCard: string
}

export interface Product {
  name: string
  quantity: number
  price: number
}

export interface Order {
  name: string
  timestamp: string
  products: Product[]
  total: number
}

export interface Message {
  title: string
  description: string
}

export interface PlaceOrderProvider {
  user: User
}

export enum FailureType {
  PaymentFail = 'PaymentFail'
}
