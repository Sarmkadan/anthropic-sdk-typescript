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

The client can be configured via constructor options or environment variables.
- `ANTHROPIC_API_KEY`: API key for authentication.
- `ANTHROPIC_BASE_URL`: Override the default API base URL.

## License

This project is licensed under the MIT License.
