import { Command } from '../instance'
import { ContextClass } from '../Context'
import { Hook } from '../Hook'
import { ActionInstance, Context, PropsType, ActionMethod, ActionHook } from '../types'
import { ForcedActionError, InternalActionError, SkipActionAndSequenceError } from '../Errors'

abstract class Action<Props extends PropsType = {}, Result extends Props = Props, Provider extends PropsType = {}> implements ActionInstance {  
  protected context!: Context<Props & Result>
  protected readonly provider!: Provider
  protected beforeHooks: ActionHook[] = []
  protected afterHooks: ActionHook[] = []
  private _context!: ContextClass<Props> & Props
  private hook!: Hook

  protected constructor(context: Context<Props> | Props, provider: Provider) {
    this._context = ContextClass.build<Props>(context)
    this.context = this._context as unknown as Context<Props & Result>
    this.provider = Object.freeze(provider)
  }

  public static async run<Props extends PropsType = {}, Result extends Props = Props>(context: Props) {
    const Klass: any = this
    const action: Action<Props, Result> = new Klass(context, Command.provider)
    await action.exec()
    return action.context as Context<Result>
  }

  public static method<Props extends PropsType = {}, Result extends Props = Props>(): ActionMethod<Props, Result> {
    return this.run.bind(this)
  }

  protected abstract run(): Promise<void>

  public rollback() {}

  protected async exec(): Promise<void> {
    this.hook = new Hook(this.beforeHooks, this.afterHooks)
    try {
      await Command._runMiddlewares(this, this.context)
      await this.hook.runBeforeHooks()
      await this.run()
      await this.hook.runAfterHooks()
      this._context._executed(this)
    } catch (error) {
      this._context._executed(this)
      if (error instanceof SkipActionAndSequenceError) {
        return
      }
      await this._context._rollback()
      if (error instanceof ContextClass) {
        return
      }
      
      if (error instanceof ForcedActionError) {
        throw error
      }

      throw new InternalActionError<Props & Result>(error as Error, this._context as ContextClass<Props & Result>)
    }
  }
}

export default Action

