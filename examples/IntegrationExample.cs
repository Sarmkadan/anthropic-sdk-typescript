using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

// Example of how to integrate the Anthropic client into ASP.NET Core Dependency Injection
public class IntegrationExample
{
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureServices((hostContext, services) =>
            {
                // Registering the client as a singleton or scoped service
                services.AddSingleton<IAnthropicClient>(sp => 
                {
                    var apiKey = hostContext.Configuration["Anthropic:ApiKey"];
                    return new AnthropicClient(apiKey);
                });
            });
}
