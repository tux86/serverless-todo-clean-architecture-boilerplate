export enum LogLevel {
    Error = 'error',
    Warn = 'warn',
    Info = 'info',
    Debug = 'debug',
}

class Logger {
  private readonly logLevel: LogLevel

  constructor (logLevel: LogLevel = LogLevel.Info) {
    this.logLevel = logLevel
  }

  private shouldLog (level: LogLevel): boolean {
    const levels = Object.values(LogLevel)
    return levels.indexOf(level) <= levels.indexOf(this.logLevel)
  }

  error (message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(LogLevel.Error)) {
      console.error(`[ERROR] ${message}`, ...optionalParams)
    }
  }

  warn (message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(LogLevel.Warn)) {
      console.warn(`[WARN] ${message}`, ...optionalParams)
    }
  }

  info (message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(LogLevel.Info)) {
      console.info(`[INFO] ${message}`, ...optionalParams)
    }
  }

  debug (message: string, ...optionalParams: any[]): void {
    if (this.shouldLog(LogLevel.Debug)) {
      console.debug(`[DEBUG] ${message}`, ...optionalParams)
    }
  }
}

export const logger = new Logger(LogLevel.Debug)
