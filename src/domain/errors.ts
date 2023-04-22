export class EntityNotFound extends Error {
  constructor (entityName: string, identifier: string) {
    super(`${entityName} with identifier ${identifier} not found`)
  }
}
