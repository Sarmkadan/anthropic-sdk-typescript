// Benchmarks for message creation operations
import { Benchmark } from 'tinybench';
import Anthropic from '@anthropic-ai/sdk';

// Sample message parameters for benchmarking
export const sampleMessageParams = {
  model: 'claude-3-opus-20240229',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Hello, Claude! Please tell me about artificial intelligence and its applications in modern technology.'
    }
  ]
};

export const messageCreationBenchmarks = new Benchmark({
  name: 'Message Creation',
  time: 2000,
  iterations: 100,
});

// Mock client for benchmarking without actual API calls
class MockAnthropicClient {
  async post() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 10));
    return {
      json: () => ({}),
      text: () => Promise.resolve('{}'),
      ok: true,
      status: 200,
      headers: new Headers()
    };
  }
}

// Test with different message sizes
const smallMessageParams = {
  model: 'claude-3-opus-20240229',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Hello' }
  ]
};

const mediumMessageParams = {
  model: 'claude-3-opus-20240229',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Hello, Claude! Please tell me about artificial intelligence and its applications in modern technology.' }
  ]
};

const largeMessageParams = {
  model: 'claude-3-opus-20240229',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Hello, Claude! '.repeat(100) }
  ]
};

messageCreationBenchmarks.add('create() with small message', () => {
  const client = new MockAnthropicClient();
  // This would normally call client.messages.create()
  // For benchmarking we measure the parameter processing overhead
  const params = { ...smallMessageParams };
  return params;
});

messageCreationBenchmarks.add('create() with medium message', () => {
  const client = new MockAnthropicClient();
  const params = { ...mediumMessageParams };
  return params;
});

messageCreationBenchmarks.add('create() with large message', () => {
  const client = new MockAnthropicClient();
  const params = { ...largeMessageParams };
  return params;
});

messageCreationBenchmarks.add('create() with multiple messages', () => {
  const client = new MockAnthropicClient();
  const params = {
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [
      { role: 'user', content: 'First message' },
      { role: 'assistant', content: 'Response to first message' },
      { role: 'user', content: 'Second message' }
    ]
  };
  return params;
});

messageCreationBenchmarks.add('create() with tools parameter', () => {
  const client = new MockAnthropicClient();
  const params = {
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Use a tool' }],
    tools: [
      {
        name: 'get_weather',
        description: 'Get weather information',
        input_schema: {
          type: 'object',
          properties: {
            location: { type: 'string' }
          }
        }
      }
    ]
  };
  return params;
});

export async function runMessageCreationBenchmarks() {
  await messageCreationBenchmarks.warmup();
  await messageCreationBenchmarks.run();
  return messageCreationBenchmarks;
}