using System;
using System.Net.Http;
using System.Threading.Tasks;

public class AdvancedUsage
{
    public static async Task Run()
    {
        // Configuring with custom base URL and timeout
        var options = new AnthropicClientOptions
        {
            ApiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY"),
            BaseUrl = "https://custom-api.example.com",
            Timeout = TimeSpan.FromSeconds(60)
        };

        var client = new AnthropicClient(options);

        try
        {
            var response = await client.Messages.CreateAsync(new MessageParameters
            {
                Model = "claude-3-opus-20240229",
                MaxTokens = 500,
                Messages = new[] { new Message { Role = "user", Content = "Explain quantum computing." } }
            });

            Console.WriteLine($"Response: {response.Content}");
        }
        catch (AnthropicApiException ex)
        {
            Console.WriteLine($"API Error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"General Error: {ex.Message}");
        }
    }
}
