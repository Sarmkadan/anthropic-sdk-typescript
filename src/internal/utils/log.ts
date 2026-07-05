// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { hasOwn } from './values';
import { type BaseAnthropic } from '../../client';
import { RequestOptions } from '../request-options';

type LogFn = (message: string, ...rest: unknown[]) => void;
export type Logger = {
  error: LogFn;
  warn: LogFn;
  info: LogFn;
  debug: LogFn;
};
export type LogLevel = 'off' | 'error' | 'warn' | 'info' | 'debug';

/**
 * Creates a structured logging wrapper that supports named parameters
 * following Microsoft.Extensions.Logging conventions
 */
export class StructuredLogger {
  /**
   * Wraps a Logger to support structured logging with named parameters
   * @param logger The base logger
   * @returns A logger with structured logging support
   */
  static wrap(logger: Logger): Logger {
    return {
      error: (message: string, ...properties: unknown[]) => {
        logger.error(message, ...properties);
      },
      warn: (message: string, ...properties: unknown[]) => {
        logger.warn(message, ...properties);
      },
      info: (message: string, ...properties: unknown[]) => {
        logger.info(message, ...properties);
      },
      debug: (message: string, ...properties: unknown[]) => {
        logger.debug(message, ...properties);
      },
    };
  }

  /**
   * Formats log message with structured properties
   * @param message The log message with optional placeholders like {ItemId}
   * @param properties Structured properties as name-value pairs
   * @returns Formatted message with properties
   */
  static formatMessage(message: string, properties: Record<string, unknown>): string {
    return message.replace(/\{(\w+)\}/g, (_, propName) => {
      if (properties && hasOwn(properties, propName)) {
        try {
          return JSON.stringify(properties[propName]);
        } catch {
          return String(properties[propName]);
        }
      }
      return '{' + propName + '}';
    });
  }

  /**
   * Logs a message with structured properties using Microsoft.Extensions.Logging style
   * @param logger The logger to use
   * @param level The log level
   * @param message The message template with placeholders like "Processing {ItemId}"
   * @param properties Structured properties as name-value pairs
   */
  static logWithProperties(logger: Logger, level: keyof Logger, message: string, properties: Record<string, unknown>): void {
    if (logger[level]) {
      logger[level](StructuredLogger.formatMessage(message, properties), properties);
    }
  }
}

export { StructuredLogger };

const levelNumbers = {
  off: 0,
  error: 200,
  warn: 300,
  info: 400,
  debug: 500,
};

export const parseLogLevel = (
  maybeLevel: string | undefined,
  sourceName: string,
  client: BaseAnthropic,
): LogLevel | undefined => {
  if (!maybeLevel) {
    return undefined;
  }
  if (hasOwn(levelNumbers, maybeLevel)) {
    return maybeLevel;
  }
  loggerFor(client).warn(
    `${sourceName} was set to ${JSON.stringify(maybeLevel)}, expected one of ${JSON.stringify(
      Object.keys(levelNumbers),
    )}`,
  );
  return undefined;
};

function noop() {}

function makeLogFn(fnLevel: keyof Logger, logger: Logger | undefined, logLevel: LogLevel) {
  if (!logger || levelNumbers[fnLevel] > levelNumbers[logLevel]) {
    return noop;
  } else {
    // Don't wrap logger functions, we want the stacktrace intact!
    return logger[fnLevel].bind(logger);
  }
}

const noopLogger = {
  error: noop,
  warn: noop,
  info: noop,
  debug: noop,
};

let cachedLoggers = /* @__PURE__ */ new WeakMap<Logger, [LogLevel, Logger]>();

export function loggerFor(client: BaseAnthropic): Logger {
  const logger = client.logger;
  const logLevel = client.logLevel ?? 'off';
  if (!logger) {
    return noopLogger;
  }

  const cachedLogger = cachedLoggers.get(logger);
  if (cachedLogger && cachedLogger[0] === logLevel) {
    return cachedLogger[1];
  }

  const levelLogger = {
    error: makeLogFn('error', logger, logLevel),
    warn: makeLogFn('warn', logger, logLevel),
    info: makeLogFn('info', logger, logLevel),
    debug: makeLogFn('debug', logger, logLevel),
  };

  cachedLoggers.set(logger, [logLevel, levelLogger]);

  return levelLogger;
}

export const formatRequestDetails = (details: {
  options?: RequestOptions | undefined;
  headers?: Headers | Record<string, string> | undefined;
  retryOfRequestLogID?: string | undefined;
  retryOf?: string | undefined;
  url?: string | undefined;
  status?: number | undefined;
  method?: string | undefined;
  durationMs?: number | undefined;
  message?: unknown;
  body?: unknown;
}) => {
  if (details.options) {
    details.options = { ...details.options };
    delete details.options['headers']; // redundant + leaks internals
  }
  if (details.headers) {
    details.headers = Object.fromEntries(
      (details.headers instanceof Headers ? [...details.headers] : Object.entries(details.headers)).map(
        ([name, value]) => [
          name,
          (
            name.toLowerCase() === 'authorization' ||
            name.toLowerCase() === 'api-key' ||
            name.toLowerCase() === 'x-api-key' ||
            name.toLowerCase() === 'cookie' ||
            name.toLowerCase() === 'set-cookie'
          ) ?
            '***'
          : value,
        ],
      ),
    );
  }
  if ('retryOfRequestLogID' in details) {
    if (details.retryOfRequestLogID) {
      details.retryOf = details.retryOfRequestLogID;
    }
    delete details.retryOfRequestLogID;
  }
  return details;
};
