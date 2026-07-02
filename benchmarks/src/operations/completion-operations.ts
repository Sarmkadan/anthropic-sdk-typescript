// Benchmarks for completion operations
import { Benchmark } from 'tinybench';
import Anthropic from '@anthropic-ai/sdk';

export const completionOperationsBenchmarks = new Benchmark({
  name: 'Completion Operations',
  time: 2000,
  iterations: 100,
});

// Mock client for benchmarking
class MockAnthropicClient {
  async post() {
    await new Promise(resolve => setTimeout(resolve, 10));
    return {
      json: () => ({}),
      ok: true,
      status: 200,
      headers: new Headers()
    };
  }
}

// Test with different completion parameters
const smallCompletionParams = {
  model: 'claude-instant-1.2',
  max_tokens_to_sample: 100,
  prompt: '\n\nHuman: Hello, Claude\n\nAssistant:'
};

const mediumCompletionParams = {
  model: 'claude-2.1',
  max_tokens_to_sample: 500,
  prompt: '\n\nHuman: Hello, Claude! Please explain the concept of machine learning and its applications in various industries.\n\nAssistant:'
};

completionOperationsBenchmarks.add('create() with small prompt', () => {
  const client = new MockAnthropicClient();
  const params = { ...smallCompletionParams };
  return params;
});

completionOperationsBenchmarks.add('create() with medium prompt', () => {
  const client = new MockAnthropicClient();
  const params = { ...mediumCompletionParams };
  return params;
});

completionOperationsBenchmarks.add('create() with streaming', () => {
  const client = new MockAnthropicClient();
  const params = {
    ...mediumCompletionParams,
    stream: true
  };
  return params;
});

completionOperationsBenchmarks.add('create() with temperature parameter', () => {
  const client = new MockAnthropicClient();
  const params = {
    ...mediumCompletionParams,
    temperature: 0.7
  };
  return params;
});

completionOperationsBenchmarks.add('create() with top_k parameter', () => {
  const client = new MockAnthropicClient();
  const params = {
    ...mediumCompletionParams,
    top_k: 50
  };
  return params;
});

completionOperationsBenchmarks.add('create() with top_p parameter', () => {
  const client = new MockAnthropicClient();
  const params = {
    ...mediumCompletionParams,
    top_p: 0.9
  };
  return params;
});

export async function runCompletionOperationsBenchmarks() {
  await completionOperationsBenchmarks.warmup();
  await completionOperationsBenchmarks.run();
  return completionOperationsBenchmarks;
}