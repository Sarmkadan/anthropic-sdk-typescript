// Throughput benchmarks using autocannon for realistic load testing
import autocannon from 'autocannon';
import { Benchmark } from 'tinybench';

interface ThroughputBenchmarkOptions {
  url: string;
  connections: number;
  duration: number;
  method: string;
  body?: string;
  headers?: Record<string, string>;
}

export async function runThroughputBenchmark(options: ThroughputBenchmarkOptions) {
  return new Promise<autocannon.Result>((resolve, reject) => {
    const instance = autocannon({
      url: options.url,
      connections: options.connections,
      duration: options.duration,
      method: options.method,
      body: options.body,
      headers: options.headers,
      rejectError: true,
    }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });

    // Handle errors
    instance.on('error', (err) => {
      reject(err);
    });
  });
}

// Benchmark for message creation throughput
const messageCreationBody = JSON.stringify({
  model: 'claude-3-opus-20240229',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Hello, Claude! Please tell me about artificial intelligence and its applications in modern technology.'
    }
  ]
});

export const throughputBenchmarks = new Benchmark({
  name: 'Throughput Tests',
  time: 5000,
  iterations: 3,
});

// These are structural benchmarks - actual execution happens in the benchmark function
throughputBenchmarks.add('message creation - 10 RPS', () => {
  return {
    description: 'Test message creation throughput at 10 requests per second',
    options: {
      url: 'http://localhost:3000/v1/messages',
      connections: 10,
      duration: '10s',
      method: 'POST',
      body: messageCreationBody,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'test-key',
        'anthropic-version': '2023-06-01'
      }
    }
  };
});

throughputBenchmarks.add('message creation - 50 RPS', () => {
  return {
    description: 'Test message creation throughput at 50 requests per second',
    options: {
      url: 'http://localhost:3000/v1/messages',
      connections: 50,
      duration: '10s',
      method: 'POST',
      body: messageCreationParams,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'test-key',
        'anthropic-version': '2023-06-01'
      }
    }
  };
});

throughputBenchmarks.add('model list - 20 RPS', () => {
  return {
    description: 'Test model list retrieval throughput at 20 requests per second',
    options: {
      url: 'http://localhost:3000/v1/models',
      connections: 20,
      duration: '10s',
      method: 'GET',
      headers: {
        'X-Api-Key': 'test-key',
        'anthropic-version': '2023-06-01'
      }
    }
  };
});

const messageCreationParams = JSON.stringify({
  model: 'claude-3-opus-20240229',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Hello' }
  ]
});

export async function runThroughputBenchmarks() {
  await throughputBenchmarks.warmup();
  await throughputBenchmarks.run();
  return throughputBenchmarks;
}