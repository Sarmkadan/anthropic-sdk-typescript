# Claude SDK for TypeScript

[![NPM version](https://img.shields.io/npm/v/@anthropic-ai/sdk.svg)](https://npmjs.org/package/@anthropic-ai/sdk)
![Build](https://github.com/sarmkadan/anthropic-sdk-typescript/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

The Claude SDK for TypeScript provides access to the Claude API from server-side TypeScript or JavaScript applications.

## Installation

```sh
npm install @anthropic-ai/sdk
```

## Quick Start

```js
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'],
});

const message = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, Claude' }],
  model: 'claude-3-opus-20240229',
});

console.log(message.content);
```

## Configuration

The Anthropic SDK for TypeScript can be configured in multiple ways:

### Constructor Options

All configuration options can be passed directly to the client constructor:

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: 'your-api-key-here',
  baseURL: 'https://api.example.com/v1/',
  timeout: 30000,
  maxRetries: 3,
  logLevel: 'info',
  defaultHeaders: {
    'X-Custom-Header': 'value'
  },
  defaultQuery: {
    'custom_param': 'value'
  }
});
```

### Environment Variables

You can also configure the client using environment variables:

- `ANTHROPIC_API_KEY`: API key for authentication
- `ANTHROPIC_BASE_URL`: Override the default API base URL
- `ANTHROPIC_AUTH_TOKEN`: Auth token for OAuth authentication
- `ANTHROPIC_WEBHOOK_SIGNING_KEY`: Signing key for webhooks
- `ANTHROPIC_LOG`: Set the log level (debug, info, warn, error)
- `ANTHROPIC_CUSTOM_HEADERS`: Custom headers in format `Header-Name: value` (one per line)

### Configuration File (appsettings.json)

For larger applications, you can use a configuration file:

```json
{
  "anthropic": {
    "apiKey": "your-api-key-here",
    "baseUrl": "https://api.anthropic.com",
    "timeout": 600000,
    "maxRetries": 2,
    "logLevel": "warn",
    "dangerouslyAllowBrowser": false
  }
}
```

See [`appsettings.example.json`](appsettings.example.json) for a complete example with all available options.

### Available Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | `string \| (() => Promise<string>) \| null` | `process.env['ANTHROPIC_API_KEY']` | API key for authentication |
| `authToken` | `string \| null` | `process.env['ANTHROPIC_AUTH_TOKEN']` | Auth token for OAuth |
| `credentials` | `any \| null` | `null` | AccessTokenProvider for OAuth/workload-identity |
| `config` | `any \| null` | `null` | AnthropicConfig object for direct credential resolution |
| `profile` | `string \| null` | `null` | Profile name to load from config files |
| `webhookKey` | `string \| null` | `process.env['ANTHROPIC_WEBHOOK_SIGNING_KEY']` | Signing key for webhooks |
| `baseURL` | `string \| null` | `"https://api.anthropic.com"` | Override the default API base URL |
| `timeout` | `number` | `600000` (10 minutes) | Maximum time to wait for a response |
| `maxRetries` | `number` | `2` | Maximum number of retry attempts |
| `defaultHeaders` | `Record<string, string>` | `{}` | Default headers to include with every request |
| `defaultQuery` | `Record<string, string \| undefined>` | `{}` | Default query parameters to include with every request |
| `dangerouslyAllowBrowser` | `boolean` | `false` | Allow usage in browser environments |
| `logLevel` | `LogLevel` | `'warn'` | Set the log level (debug, info, warn, error) |
| `logger` | `Logger` | `console` | Custom logger implementation |
| `fetchOptions` | `Record<string, unknown>` | `{}` | Additional RequestInit options for fetch |

### Validation

The SDK provides runtime validation for configuration options using Zod. You can validate your configuration:

```typescript
import { validateOptions, toClientOptions } from '@anthropic-ai/sdk/options';

const config = {
  apiKey: 'your-key',
  timeout: 30000,
  maxRetries: 5
};

const validated = validateOptions(config); // Throws if validation fails
const clientOptions = toClientOptions(validated);

const client = new Anthropic(clientOptions);
```

### TypeScript Support

All configuration options are fully typed. The `ClientOptions` interface is exported for use in your applications:

```typescript
import type { ClientOptions } from '@anthropic-ai/sdk';

const options: ClientOptions = {
  apiKey: process.env.API_KEY,
  timeout: 30000
};
```

## Usage Examples

For examples of how to use the API (including C# conceptual examples), please see the [examples/](examples/) directory.

## Docker

You can use the provided Docker configuration to build and work with the SDK in a containerized environment.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Usage

To build and run the development container:

```sh
docker-compose up -d
```

To run commands inside the container:

```sh
docker-compose exec sdk yarn test
```

## Performance Benchmarks

This project includes performance benchmarks using [BenchmarkDotNet](https://benchmarkdotnet.org/) to measure the performance of critical operations.

### Running Benchmarks

1. Install [.NET SDK](https://dotnet.microsoft.com/download)
2. Navigate to `benchmarks-dotnet/AnthropicSdkBenchmarks/`
3. Run the benchmarks:

```sh
dotnet run -c Release
```

### Results

| Method           | Mean     | Error    | StdDev   | Gen0   | Allocated |
|----------------- |---------:|---------:|---------:|-------:|----------:|
| SerializeRequest | 561.6 ns | 10.27 ns | 12.22 ns | 0.0648 |     544 B |

## License

This project is licensed under the MIT License.
