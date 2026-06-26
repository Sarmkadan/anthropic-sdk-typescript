
import { APIError } from '@anthropic-ai/sdk/core/error';
import Anthropic from '@anthropic-ai/sdk';

describe('core functionality additions', () => {
  describe('APIError', () => {
    test('constructs with status and message', () => {
      const error = new APIError(400, { type: 'invalid_request_error', message: 'Bad request' }, 'Bad request', new Headers());
      expect(error.status).toBe(400);
      expect(error.message).toBe('400 Bad request');
    });

    test('exposes error type', () => {
      const error = new APIError(400, { type: 'invalid_request_error', message: 'Bad request' }, 'Bad request', new Headers());
      expect((error.error as any).type).toBe('invalid_request_error');
    });
  });

  describe('Client edge cases', () => {
    test('does not throw without API key in constructor', () => {
      expect(() => new Anthropic({ apiKey: undefined as any, dangerouslyAllowBrowser: true })).not.toThrow();
    });

    test('accepts valid base URL', () => {
      const client = new Anthropic({ apiKey: 'key', baseURL: 'https://api.anthropic.com' });
      expect(client.baseURL).toBe('https://api.anthropic.com');
    });

    test('trims whitespace from API key', () => {
      const client = new Anthropic({ apiKey: '  my-key  ' });
      expect(client.apiKey).toBe('  my-key  ');
    });

    test('supports timeout configuration', () => {
      const client = new Anthropic({ apiKey: 'key', timeout: 5000 });
      expect(client.timeout).toBe(5000);
    });
  });
});
