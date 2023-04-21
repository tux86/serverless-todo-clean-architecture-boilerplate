import { todoFunctions } from './todoFunctions'
import { userFunctions } from './userFunctions'

export const functions = {
  ...userFunctions,
  ...todoFunctions
}
