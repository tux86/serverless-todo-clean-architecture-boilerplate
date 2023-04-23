export class AuthSuccessResult {
  token: string

  constructor (token: string) {
    this.token = token
  }

  toJSON (): Record<string, any> {
    return {
      token: this.token
    }
  }
}
