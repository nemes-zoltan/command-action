import { Command } from '../instance'
import { PropsType, ActionInstance, FailureType } from '../types'
import { ForcedActionError, SkipActionAndSequenceError } from '../Errors'
import { Sequence } from '../Sequence'

interface FailureMeta extends Record<string, any> {
  extras?: Record<string, any>
  type: string
  message?: string | string[]
  force: boolean
}

type FailParams = Partial<Pick<FailureMeta, 'type' | 'force'>> & Pick<FailureMeta, 'message'>

class Context<Props extends PropsType> {
  private _actions: ActionInstance[] = []
  private _rolledback: boolean = false
  private _failureMeta!: FailureMeta
  private _sequence: Sequence<Props> | null = null

  constructor(context: Props) {
    Object.assign(this, context)
  }

  public static build<Props extends PropsType>(props: Context<Props> | Props = {} as Props): Context<Props> & Props {
    const context = props instanceof Context ? props : new Context(props)

    return context as Context<Props> & Props
  }

  public isSuccess(): boolean {
    return !this.isFailure()
  }

  public isFailure(type?: string): boolean {
    if (type) {
      return this._failureMeta && this._failureMeta.type === type
    }

    return this._failureMeta && !!this._failureMeta.type
  }

  public failure(key?: keyof FailureMeta): FailureMeta[keyof FailureMeta] | FailureMeta {
    if (key && this._failureMeta[key]) {
      return this._failureMeta[key]
    }

    return this._failureMeta
  }

  public fail({ type = FailureType.Standard, message, force = Command.config.defaultForceFailures, ...rest }: FailParams): never {
    this._failureMeta = {
      type,
      message,
      force,
      extras: rest
    }
   
    if (force) {
      throw new ForcedActionError<Props>(this)
    }

    throw this
  }

  public skip() {
    if (this._sequence) {
      this._sequence.skip = true
    }
    throw new SkipActionAndSequenceError()
  }

  public _executed(action: ActionInstance): void {
    this._actions.push(action)
  }

  public async _rollback(): Promise<boolean> {
    if (this._rolledback) {
      return false
    }

    for (let action of this._actions.reverse()) {
      await action.rollback()
    }

    this._rolledback = true

    return true
  }

  public toJSON() {
    const { _actions, _rolledback, _sequence, _executed, ...rest } = this

    return rest
  }

  private _setSequence(sequence: Sequence<Props>) {
    this._sequence = sequence
  }

  private _removeSequence() {
    this._sequence = null
  }
}

export default Context
