import { interfaces } from 'inversify'

import { Logger } from '@/infrastructure/utils/Logger'

export function logDependencyMiddleware(planAndResolve: interfaces.Next): interfaces.Next {
  return (args: interfaces.NextArgs) => {
    const result = planAndResolve(args)
    const identifier = args.serviceIdentifier
    const dependencyName = typeof identifier === 'function' ? identifier.name : identifier.toString()

    Logger.getInstance().debug(` *** DIContainer *** Loaded dependency : ${dependencyName}`)
    return result
  }
}
