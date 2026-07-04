// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { LogLevel } from './internal/utils/log';
import type { ClientOptions } from './client';

/**
 * @summary Configuration options for the Anthropic SDK.
 * This interface provides a structured way to configure the client with validation.
 *
 * All properties are optional to allow for flexible configuration from different sources
 * (environment variables, config files, constructor arguments, etc.)
 */
export interface AnthropicSdkTypescriptOptions {
  /**
   * API key used for authentication.
   * Accepts either a static string or an async function that resolves to a string.
   * When a function is provided, it is invoked before each request so you can rotate
   * or refresh credentials at runtime.
   *
   * Environment variable: ANTHROPIC_API_KEY
   */
  apiKey?: string | (() => Promise<string>) | null;

  /**
   * Auth token for OAuth authentication.
   *
   * Environment variable: ANTHROPIC_AUTH_TOKEN
   */
  authToken?: string | null;

  /**
   * An AccessTokenProvider for OAuth/workload-identity authentication.
   * When set, the provider is wrapped in a TokenCache and used for
   * Bearer token auth on every request.
   */
  credentials?: any | null;

  /**
   * An AnthropicConfig object to resolve credentials from directly.
   * This is the TypeScript equivalent of Go's option.WithConfig(cfg).
   */
  config?: any | null;

  /**
   * Name of a profile to load from config files.
   *
   * Mutually exclusive with credentials and config.
   */
  profile?: string | null;

  /**
   * Signing key for webhooks.
   *
   * Environment variable: ANTHROPIC_WEBHOOK_SIGNING_KEY
   */
  webhookKey?: string | null;

  /**
   * Override the default base URL for the API.
   *
   * Environment variable: ANTHROPIC_BASE_URL
   * Default: https://api.anthropic.com
   */
  baseURL?: string | null;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait
   * for a response from the server before timing out a single request.
   *
   * Default: 600000 (10 minutes)
   */
  timeout?: number;

  /**
   * The maximum number of times that the client will retry a request in case
   * of a temporary failure.
   *
   * Default: 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: Record<string, string>;

  /**
   * Default query parameters to include with every request to the API.
   * These can be removed in individual requests by explicitly setting the param to
   * `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined>;

  /**
   * By default, client-side use of this library is not allowed, as it risks exposing
   * your secret API credentials to attackers.
   * Only set this option to `true` if you understand the risks and have appropriate
   * mitigations in place.
   *
   * Default: false
   */
  dangerouslyAllowBrowser?: boolean;

  /**
   * Set the log level.
   *
   * Default: 'warn'
   */
  logLevel?: LogLevel;

  /**
   * Set a custom logger implementation.
   * Defaults to globalThis.console
   */
  logger?: any;

  /**
   * Additional RequestInit options to be passed to fetch calls.
   * Properties will be overridden by per-request fetchOptions.
   */
  fetchOptions?: Record<string, unknown>;
}

/**
 * Validates configuration options and provides helpful error messages.
 *
 * @param options - Configuration options to validate
 * @returns Validated options
 * @throws {Error} If validation fails
 */
export function validateOptions(options: unknown): any {
  if (options == null || typeof options !== 'object') {
    throw new Error('Configuration must be an object');
  }

  const result: any = {};

  // Validate each property
  const input = options as Record<string, unknown>;

  if ('apiKey' in input) {
    const value = input['apiKey'];
    if (value !== null && value !== undefined && typeof value !== 'string' && typeof value !== 'function') {
      throw new Error('apiKey must be a string, function, or null');
    }
    result['apiKey'] = value;
  }

  if ('authToken' in input) {
    const value = input['authToken'];
    if (value !== null && value !== undefined && typeof value !== 'string') {
      throw new Error('authToken must be a string or null');
    }
    result['authToken'] = value;
  }

  if ('credentials' in input) {
    result['credentials'] = input['credentials'];
  }

  if ('config' in input) {
    result['config'] = input['config'];
  }

  if ('profile' in input) {
    const value = input['profile'];
    if (value !== null && value !== undefined && typeof value !== 'string') {
      throw new Error('profile must be a string or null');
    }
    result['profile'] = value;
  }

  if ('webhookKey' in input) {
    const value = input['webhookKey'];
    if (value !== null && value !== undefined && typeof value !== 'string') {
      throw new Error('webhookKey must be a string or null');
    }
    result['webhookKey'] = value;
  }

  if ('baseURL' in input) {
    const value = input['baseURL'];
    if (value !== null && value !== undefined) {
      if (typeof value !== 'string') {
        throw new Error('baseURL must be a string or null');
      }
      if (!value.match(/^https?:\/\//i)) {
        throw new Error('baseURL must be a valid HTTP/HTTPS URL');
      }
    }
    result['baseURL'] = value;
  }

  if ('timeout' in input) {
    const value = input['timeout'];
    if (value !== null && value !== undefined) {
      if (typeof value !== 'number' || !Number.isInteger(value)) {
        throw new Error('timeout must be an integer');
      }
      if (value <= 0) {
        throw new Error('timeout must be a positive integer');
      }
    }
    result['timeout'] = value;
  }

  if ('maxRetries' in input) {
    const value = input['maxRetries'];
    if (value !== null && value !== undefined) {
      if (typeof value !== 'number' || !Number.isInteger(value)) {
        throw new Error('maxRetries must be an integer');
      }
      if (value < 0) {
        throw new Error('maxRetries must be a non-negative integer');
      }
    }
    result['maxRetries'] = value;
  }

  if ('defaultHeaders' in input) {
    const value = input['defaultHeaders'];
    if (value !== null && value !== undefined) {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        throw new Error('defaultHeaders must be an object');
      }
      // Validate each header value is a string
      for (const key in value) {
        if (typeof (value as Record<string, unknown>)[key] !== 'string') {
          throw new Error(`defaultHeaders['${key}'] must be a string`);
        }
      }
    }
    result['defaultHeaders'] = value;
  }

  if ('defaultQuery' in input) {
    const value = input['defaultQuery'];
    if (value !== null && value !== undefined) {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        throw new Error('defaultQuery must be an object');
      }
    }
    result['defaultQuery'] = value;
  }

  if ('dangerouslyAllowBrowser' in input) {
    const value = input['dangerouslyAllowBrowser'];
    if (value !== null && value !== undefined && typeof value !== 'boolean') {
      throw new Error('dangerouslyAllowBrowser must be a boolean');
    }
    result['dangerouslyAllowBrowser'] = value;
  }

  if ('logLevel' in input) {
    const value = input['logLevel'];
    if (value !== null && value !== undefined) {
      const validLevels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
      if (!validLevels.includes(value as LogLevel)) {
        throw new Error('logLevel must be one of: debug, info, warn, error');
      }
    }
    result['logLevel'] = value;
  }

  if ('logger' in input) {
    result['logger'] = input['logger'];
  }

  if ('fetchOptions' in input) {
    result['fetchOptions'] = input['fetchOptions'];
  }

  return result;
}

/**
 * Creates a ClientOptions object from validated configuration.
 * This function maps the public AnthropicSdkTypescriptOptions interface to the
 * internal ClientOptions interface expected by the Anthropic client.
 *
 * @param options - Validated configuration options
 * @returns ClientOptions object ready for use with Anthropic client
 */
export function toClientOptions(options: any): ClientOptions {
  return {
    apiKey: options.apiKey,
    authToken: options.authToken,
    credentials: options.credentials,
    config: options.config,
    profile: options.profile,
    webhookKey: options.webhookKey,
    baseURL: options.baseURL,
    timeout: options.timeout,
    maxRetries: options.maxRetries,
    defaultHeaders: options.defaultHeaders,
    defaultQuery: options.defaultQuery,
    dangerouslyAllowBrowser: options.dangerouslyAllowBrowser,
    logLevel: options.logLevel,
    logger: options.logger,
    fetchOptions: options.fetchOptions,
  };
}
