// Benchmarks for client creation and initialization
import { Benchmark } from 'tinybench';
import Anthropic from '@anthropic-ai/sdk';

export const clientCreationBenchmarks = new Benchmark({
  name: 'Client Creation',
  time: 1000,
  iterations: 1000,
});

clientCreationBenchmarks.add('new Anthropic() with no options', () => {
  new Anthropic();
});

clientCreationBenchmarks.add('new Anthropic({ apiKey: string })', () => {
  new Anthropic({ apiKey: 'test-key' });
});

clientCreationBenchmarks.add('new Anthropic({ baseURL: string })', () => {
  new Anthropic({ baseURL: 'https://api.example.com/v1' });
});

clientCreationBenchmarks.add('new Anthropic({ timeout: number })', () => {
  new Anthropic({ timeout: 30000 });
});

clientCreationBenchmarks.add('new Anthropic({ maxRetries: number })', () => {
  new Anthropic({ maxRetries: 5 });
});

clientCreationBenchmarks.add('new Anthropic({ defaultHeaders: Record })', () => {
  new Anthropic({ defaultHeaders: { 'X-Custom-Header': 'value' } });
});

clientCreationBenchmarks.add('new Anthropic({ fetchOptions: object })', () => {
  new Anthropic({ fetchOptions: { keepalive: true } });
});

export async function runClientCreationBenchmarks() {
  await clientCreationBenchmarks.warmup();
  await clientCreationBenchmarks.run();
  return clientCreationBenchmarks;
}