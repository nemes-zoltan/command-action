import { Action } from '../Action'
import { Sequence } from '../Sequence'
import { ActionMethod, CommandActionConfig, Context, PropsType } from '../types'

export type Middleware = (action: Action | Sequence, context: Context<PropsType>, provider: PropsType | null) => Promise<void>

class Command {
  private static command: Command | null = null
  public provider: PropsType | null = null
  public config: CommandActionConfig = {
    defaultForceFailures: false
  }
  private middlewares: Middleware[] = []

  public registerMiddleware(middleware: Middleware) {
    this.middlewares.push(middleware)
  }

  public static instance() {
    if (!this.command) {
      this.command = new Command()
    }

    return this.command
  }

  public settings(config: Partial<CommandActionConfig>) {
    this.config = {
      ...this.config,
      ...config
    }

    return this
  }

  public async runWithProvider<Props extends PropsType, Result extends Props = Props>(
    action: ActionMethod<Props, Result>, props: (Parameters<typeof action>)[0], provider: PropsType
  ) {
    this.provider = provider
    const context = await action(props)
    this.provider = null

    return context as Context<Result>
  }

  public async _runMiddlewares(action: Action | Sequence, context: Context<PropsType>) {
    for (const middleware of this.middlewares) {
      await middleware(action, context, this.provider)
    }
  }
}

export default Command
