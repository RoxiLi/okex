import {Injectable, Logger} from '@nestjs/common'
import {ConsoleLogger} from "@nestjs/common";

@Injectable()
export class LoggerService extends ConsoleLogger {

  private static out(payload) {
    if (process.env.APP_ENV !== 'local') {
      return console.log(JSON.stringify(payload))
    }
    console.log(JSON.stringify(payload, undefined, 2))
  }

  json(message, data) {
    if (!data) data = {}
    const payload: any = {message, status: 'info', ...data}
    LoggerService.out(payload)
  }

  log(message: any, context?: string): void {
    const ignoredContexts = ['RoutesResolver', 'RouterExplorer']
    if (ignoredContexts.includes(context)) return
    const data = {status: 'info', message, context}
    LoggerService.out(data)
  }

  warn(message: any, context?: string): void {
    const data = {status: 'warn', message, context}
    LoggerService.out(data)
  }

  error(message: any, trace?: string, context?: string): void {
    const data = {status: 'error', message, trace, context}
    LoggerService.out(data)
  }

  exception(e) {
    this.error(e.message, e.trace)
  }
}