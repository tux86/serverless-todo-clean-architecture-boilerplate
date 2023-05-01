export enum LogLevel {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug'
}

export interface ILogger {
  error(message: string, ...optionalParams: any[]): void

  warn(message: string, ...optionalParams: any[]): void

  info(message: string, ...optionalParams: any[]): void

  debug(message: string, ...optionalParams: any[]): void
}

export class Logger implements ILogger {
  private static instance: ILogger | null = null
  private readonly logLevel: LogLevel

  constructor(logLevel: LogLevel = LogLevel.Info) {
    this.logLevel = logLevel
  }

  public static getInstance(): ILogger {
    if (!Logger.instance) {
      Logger.instance = new Logger(LogLevel.Debug)
    }
    return Logger.instance
  }

  error(message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(LogLevel.Error)) {
      // eslint-disable-next-line no-console
      console.error(`[ERROR] ${message}`, ...optionalParams)
    }
  }

  warn(message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(LogLevel.Warn)) {
      // eslint-disable-next-line no-console
      console.warn(`[WARN] ${message}`, ...optionalParams)
    }
  }

  info(message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(LogLevel.Info)) {
      // eslint-disable-next-line no-console
      console.info(`[INFO] ${message}`, ...optionalParams)
    }
  }

  debug(message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(LogLevel.Debug)) {
      // eslint-disable-next-line no-console
      console.debug(`[DEBUG] ${message}`, ...optionalParams)
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel)
    return levels.indexOf(level) <= levels.indexOf(this.logLevel)
  }
}
