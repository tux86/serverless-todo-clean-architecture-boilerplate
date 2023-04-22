import { todoFunctions } from './todoFunctions'
import { userFunctions } from './userFunctions'

export const functions : { [key: string]: any} = {
  ...userFunctions,
  ...todoFunctions
}
