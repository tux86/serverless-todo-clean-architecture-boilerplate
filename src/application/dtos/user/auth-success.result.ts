export class AuthSuccessResult {
  readonly token: string

  constructor(token: string) {
    this.token = token
  }

  toJSON(): Record<string, any> {
    return {
      token: this.token
    }
  }
}
