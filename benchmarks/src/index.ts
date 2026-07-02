// Main benchmark runner for Anthropic SDK
import { Benchmark } from 'tinybench';
import { runClientCreationBenchmarks } from './operations/client-creation';
import { runMessageCreationBenchmarks } from './operations/message-creation';
import { runModelOperationsBenchmarks } from './operations/model-operations';
import { runCompletionOperationsBenchmarks } from './operations/completion-operations';
import { runThroughputBenchmarks } from './operations/throughput';

export async function runAllBenchmarks() {
  console.log('Starting Anthropic SDK Benchmarks...\n');

  const benchmarks: Array<Benchmark> = [];

  // Run client creation benchmarks
  console.log('Running Client Creation Benchmarks...');
  const clientBenchmarks = await runClientCreationBenchmarks();
  benchmarks.push(clientBenchmarks);
  console.log(clientBenchmarks.table());
  console.log('');

  // Run message creation benchmarks
  console.log('Running Message Creation Benchmarks...');
  const messageBenchmarks = await runMessageCreationBenchmarks();
  benchmarks.push(messageBenchmarks);
  console.log(messageBenchmarks.table());
  console.log('');

  // Run model operations benchmarks
  console.log('Running Model Operations Benchmarks...');
  const modelBenchmarks = await runModelOperationsBenchmarks();
  benchmarks.push(modelBenchmarks);
  console.log(modelBenchmarks.table());
  console.log('');

  // Run completion operations benchmarks
  console.log('Running Completion Operations Benchmarks...');
  const completionBenchmarks = await runCompletionOperationsBenchmarks();
  benchmarks.push(completionBenchmarks);
  console.log(completionBenchmarks.table());
  console.log('');

  // Run throughput benchmarks
  console.log('Running Throughput Benchmarks...');
  const throughputBenchmarks = await runThroughputBenchmarks();
  benchmarks.push(throughputBenchmarks);
  console.log(throughputBenchmarks.table());
  console.log('');

  console.log('All benchmarks completed!');
  console.log('\nSummary:');
  benchmarks.forEach(benchmark => {
    console.log(`- ${benchmark.name}: ${benchmark.tasks.length} tasks, ${benchmark.results.length} results`);
  });
}

// Run benchmarks when called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllBenchmarks().catch(console.error);
}

export {
  runAllBenchmarks,
  runClientCreationBenchmarks,
  runMessageCreationBenchmarks,
  runModelOperationsBenchmarks,
  runCompletionOperationsBenchmarks,
  runThroughputBenchmarks
};