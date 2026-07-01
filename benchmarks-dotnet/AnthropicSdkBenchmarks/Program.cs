using BenchmarkDotNet.Running;
using BenchmarkDotNet.Attributes;
using System.Text.Json;

namespace AnthropicSdkBenchmarks
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BenchmarkRunner.Run<SerializationBenchmarks>();
        }
    }

    [MemoryDiagnoser]
    public class SerializationBenchmarks
    {
        private readonly object _request = new {
            model = "claude-3-5-sonnet-20241022",
            max_tokens = 1024,
            messages = new[] {
                new { role = "user", content = "Hello!" }
            }
        };

        [Benchmark]
        public string SerializeRequest()
        {
            return JsonSerializer.Serialize(_request);
        }
    }
}
