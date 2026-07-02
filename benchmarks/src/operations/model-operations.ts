// Benchmarks for model operations
import { Benchmark } from 'tinybench';
import Anthropic from '@anthropic-ai/sdk';

export const modelOperationsBenchmarks = new Benchmark({
  name: 'Model Operations',
  time: 2000,
  iterations: 50,
});

// Mock client for benchmarking
class MockAnthropicClient {
  async get() {
    await new Promise(resolve => setTimeout(resolve, 5));
    return {
      json: () => ({}),
      ok: true,
      status: 200,
      headers: new Headers()
    };
  }
}

modelOperationsBenchmarks.add('list() - retrieve model list', () => {
  const client = new MockAnthropicClient();
  const params = {
    limit: 100,
    before: undefined,
    after: undefined
  };
  return params;
});

modelOperationsBenchmarks.add('retrieve() - get specific model', () => {
  const client = new MockAnthropicClient();
  const params = { model: 'claude-3-opus-20240229' };
  return params;
});

modelOperationsBenchmarks.add('retrieve() - get claude-3-5-sonnet', () => {
  const client = new MockAnthropicClient();
  const params = { model: 'claude-3-5-sonnet-20241022' };
  return params;
});

modelOperationsBenchmarks.add('retrieve() - get claude-3-5-haiku', () => {
  const client = new MockAnthropicClient();
  const params = { model: 'claude-3-5-haiku-20241022' };
  return params;
});

// Test with different parameter combinations
modelOperationsBenchmarks.add('list() with limit parameter', () => {
  const client = new MockAnthropicClient();
  const params = { limit: 50 };
  return params;
});

modelOperationsBenchmarks.add('list() with pagination', () => {
  const client = new MockAnthropicClient();
  const params = {
    limit: 25,
    before: 'before_cursor_value',
    after: 'after_cursor_value'
  };
  return params;
});

export async function runModelOperationsBenchmarks() {
  await modelOperationsBenchmarks.warmup();
  await modelOperationsBenchmarks.run();
  return modelOperationsBenchmarks;
}