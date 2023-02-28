import { ActionClass, ActionMethod, Context, PropsType } from '../types'

class Sequence<Props extends PropsType, Result extends Props = Props> {
  protected actions: ActionClass[] = []

  public static async run<Props extends PropsType, Result extends Props = Props>(context: Props) {
    const Klass: any = this
    const sequence: Sequence<Props, Result> = new Klass()
    return await sequence.run(context)
  }

  public static method<Props extends PropsType, Result extends Props = Props>(): ActionMethod<Props, Result> {
    return this.run.bind(this)
  }

  private async run(context: Context<Props> | Props): Promise<Context<Result>> {
    for (let action of this.actions) {
      context = await action.run(context)
      if (context.isFailure()) {
        break
      }
    }
    return context as Context<Result>
  }
}

export default Sequence
