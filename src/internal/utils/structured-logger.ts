// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Logger } from './log';

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
   * Extracts named parameters from arguments
   */
  static extractNamedParameters(args: IArguments | unknown[]): { message: string; properties: Record<string, unknown> } {
    const result: { message: string; properties: Record<string, unknown> } = {
      message: '',
      properties: {},
    };

    if (args.length === 0) {
      return result;
    }

    // If first argument is a string with placeholders like "Processing {ItemId}", treat as template
    if (typeof args[0] === 'string' && args[0].includes('{')) {
      result.message = args[0];
      // Extract properties from subsequent arguments
      if (args.length > 1 && typeof args[1] === 'object' && args[1] !== null) {
        result.properties = args[1] as Record<string, unknown>;
      }
    } else {
      // Traditional message + rest parameters
      result.message = String(args[0]);
      result.properties = {};
      for (let i = 1; i < args.length; i++) {
        result.properties[`arg${i}`] = args[i];
      }
    }

    return result;
  }
}

function hasOwn(obj: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Helper to create structured log methods
 */
export function createStructuredLogMethod(
  level: keyof Logger,
  logger: Logger,
): (...args: unknown[]) => void {
  return (...args: unknown[]) => {
    const { message, properties } = StructuredLogger.extractNamedParameters(args as any);
    if (Object.keys(properties).length > 0) {
      logger[level](StructuredLogger.formatMessage(message, properties), properties);
    } else {
      logger[level](message);
    }
  };
}
