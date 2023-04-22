import { AWS } from '@serverless/typescript'

import { todoFunctions } from './todoFunctions'
import { userFunctions } from './userFunctions'

export const createFunctions = () : AWS['functions'] => {
  return {
    ...userFunctions,
    ...todoFunctions
  }
}
