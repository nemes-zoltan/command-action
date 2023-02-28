import { ActionHook } from '../types'

class Hook {
  constructor(private beforeHooks: ActionHook[], private afterHooks: ActionHook[]) {
  }

  public async runBeforeHooks(): Promise<void> {
    for (let hook of this.beforeHooks) {
      await hook()
    }
  }

  public async runAfterHooks(): Promise<void> {
    for (let hook of this.afterHooks) {
      await hook()
    }
  }
}

export default Hook
