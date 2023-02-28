import { ContextClass } from '../Context'
import { PropsType } from '../types'

class InternalActionError<Props extends PropsType> extends Error {
  constructor(public error: Error, public context: ContextClass<Props>) {
    super()
    this.message = error.message
  }
}

export default InternalActionError
