import { ContextClass } from './Context'

export type PropsType = Record<string, any>

export type ActionHook = () => void

export type ActionMethod<Props extends PropsType, Result extends Props = Props> =
  (context: Props) => Promise<Context<Result> & Result>

export type Context<Props extends PropsType> = 
  Omit<ContextClass<Props>,  '_executed' | '_rollback' | '_sequence'> & Props & Record<string, any>

export type ActionInstance = {
  rollback(): Promise<void> | void
}  

export type ActionClass = {
  run: <Props extends PropsType, Result extends Props = Props>(context: Context<Props> | Props) => Promise<Context<Result>>
}

export enum FailureType {
  Standard = 'Standard'
}

export interface CommandActionConfig {
  defaultForceFailures: boolean
}
