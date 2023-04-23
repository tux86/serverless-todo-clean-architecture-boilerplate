export class UseCaseError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class InvalidInputError extends UseCaseError {}
