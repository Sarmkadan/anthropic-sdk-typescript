using System;
using System.Threading.Tasks;

// Assuming a hypothetical Anthropic client library for C#
// This demonstrates the API structure based on the TypeScript SDK
public class BasicUsage
{
    public static async Task Main(string[] args)
    {
        var client = new AnthropicClient(Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY"));

        var message = await client.Messages.CreateAsync(new MessageParameters
        {
            MaxTokens = 1024,
            Messages = new[] { new Message { Role = "user", Content = "Hello, world!" } },
            Model = "claude-3-opus-20240229"
        });

        Console.WriteLine(message.Content);
    }
}
