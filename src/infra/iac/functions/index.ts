import { todoFunctions } from './todoFunctions'
import { userFunctions } from './userFunctions'

export const createFunctions = () : { [key: string]: any} => {
  return {
    ...userFunctions,
    ...todoFunctions
  }
}
