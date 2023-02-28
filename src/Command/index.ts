import { ActionMethod, CommandActionConfig, Context, PropsType } from '../types'

class Command {
  private static command: Command | null = null
  public provider: PropsType | null = null
  public config: CommandActionConfig = {
    defaultForceFailures: false
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
}

export default Command
