import { ContextClass } from '../Context'
import { PropsType } from '../types'

class ForcedActionError<Props extends PropsType> extends Error {
  constructor(public context: ContextClass<Props>) {
    super()
    this.message = context.failure('message')
  }
}

export default ForcedActionError
