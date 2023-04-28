import { AWS } from '@serverless/typescript'

import { todoFunctions } from './todo-functions'
import { userFunctions } from './user-functions'

export const functions = (): AWS['functions'] => {
  return {
    ...userFunctions(),
    ...todoFunctions()
  }
}
