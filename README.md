# Soldier 🎖️

> A modern CLI framework for JavaScript & TypeScript with zero dependencies

Works perfectly with plain JavaScript, but gives you amazing type inference when you use TypeScript.

## Features

- **Zero Dependencies** - Lightweight and fast
- **Full TypeScript Support** - Native type inference for all options
- **Automatic Validation** - Built-in validators for choices, min/max, required
- **Type Conversion** - Automatic parsing of strings, numbers, and booleans
- **Modern API** - Clean, fluent interface with async/await support
- **Works with JavaScript** - All features available in plain JS too

## Installation

```bash
npm install soldier
```

## Quick Start

```typescript
import { cli } from 'soldier';

const app = cli('my-app')
  .version('1.0.0')
  .description('My awesome CLI');

app
  .command('deploy')
  .description('Deploy to environment')
  .option('--env <env>', {
    description: 'Environment',
    choices: ['prod', 'dev', 'staging'] as const,
    required: true
  })
  .option('--force', {
    description: 'Force deployment',
    type: 'boolean'
  })
  .option('--port <port>', {
    type: 'number',
    min: 1,
    max: 65535,
    default: 3000
  })
  .action(async (opts) => {
    // opts is fully typed!
    // opts.env: 'prod' | 'dev' | 'staging'
    // opts.force: boolean | undefined
    // opts.port: number

    console.log(`Deploying to ${opts.env} on port ${opts.port}`);
  });

app.parse();
```

### JavaScript Users

Works exactly the same in plain JavaScript! Just remove the `as const`:

```javascript
import { cli } from 'soldier';

const app = cli('my-app')
  .version('1.0.0');

app
  .command('deploy')
  .option('--env <env>', {
    choices: ['prod', 'dev', 'staging'],  // No "as const" needed
    required: true
  })
  .option('--port <port>', {
    type: 'number',
    min: 1,
    max: 65535,
    default: 3000
  })
  .action(async (opts) => {
    // All validation automatic!
    // opts.port is already a number (not a string!)
    console.log(`Deploying to ${opts.env} on port ${opts.port}`);
  });

app.parse();
```

You get all the same features - validation, type conversion, clean API. The only difference is TypeScript gives you IntelliSense autocomplete.

**[See full JavaScript guide →](./JAVASCRIPT.md)**

## Features

### 🎯 Full Type Inference

Options are automatically typed based on their configuration:

```typescript
app
  .command('serve')
  .option('--port <port>', { type: 'number', default: 3000 })
  .option('--host <host>', { default: 'localhost' })
  .option('--watch', { type: 'boolean' })
  .action((opts) => {
    opts.port   // number
    opts.host   // string
    opts.watch  // boolean | undefined
  });
```

### ✅ Built-in Validation

No need for manual validation logic:

```typescript
app
  .command('config')
  .option('--env <env>', {
    choices: ['production', 'staging', 'development'] as const,
    required: true  // Error if not provided
  })
  .option('--timeout <ms>', {
    type: 'number',
    min: 100,      // Error if less than 100
    max: 30000     // Error if greater than 30000
  })
  .action((opts) => {
    // All validation is done automatically
  });
```

### 🔄 Automatic Type Conversion

Values are automatically parsed to the correct type:

```typescript
// $ my-cli calc --x 5 --y 10 --verbose

app
  .command('calc')
  .option('--x <number>', { type: 'number' })
  .option('--y <number>', { type: 'number' })
  .option('--verbose', { type: 'boolean' })
  .action((opts) => {
    const result = opts.x + opts.y;  // No parsing needed!
    console.log(result);             // 15 (not "510")
  });
```

### 📚 Beautiful Auto-Generated Help

Help text is automatically generated from your configuration:

```
$ my-cli deploy --help

Deploy application to specified environment

Usage:
  my-cli deploy [options]

Options:
      --env <value>        Target environment (required, choices: production, staging, development)
      --force              Force deployment (default: false)
      --port <value>       Port number (default: 3000, min: 1, max: 65535)

Examples:
  $ my-cli deploy --env production --force
    Deploy to production
```

### ⚡ Short Aliases

Add convenient short flags:

```typescript
app
  .command('build')
  .option('-o, --output <path>', {
    description: 'Output directory',
    default: 'dist'
  })
  .option('-w, --watch', {
    type: 'boolean',
    description: 'Watch for changes'
  })
  .action((opts) => {
    // Can use -o or --output
  });
```

### 📖 Examples

Add helpful examples to your commands:

```typescript
app
  .command('deploy')
  .option('--env <env>', { choices: ['prod', 'dev'] as const })
  .example('my-cli deploy --env prod', 'Deploy to production')
  .example('my-cli deploy --env dev', 'Deploy to development')
  .action((opts) => {
    // ...
  });
```

## API Reference

### cli(name: string)

Create a new CLI application.

```typescript
const app = cli('my-app');
```

### .version(version: string)

Set the CLI version.

```typescript
app.version('1.0.0');
```

### .description(description: string)

Set the CLI description.

```typescript
app.description('My awesome CLI');
```

### .command(name: string)

Create a new command.

```typescript
app.command('build');
```

### .option(flags: string, config: OptionConfig)

Add an option to a command.

```typescript
command.option('--env <environment>', {
  description: 'Target environment',
  choices: ['prod', 'dev'] as const,
  required: true
});
```

#### Option Configuration

```typescript
{
  description?: string;    // Help text
  type?: 'string' | 'number' | 'boolean';  // Type (inferred from flags if not set)
  required?: boolean;      // Make option required
  default?: any;           // Default value
  alias?: string;          // Short flag (auto-extracted from flags)

  // String options:
  choices?: readonly string[];  // Allowed values

  // Number options:
  min?: number;            // Minimum value
  max?: number;            // Maximum value
}
```

### .action(handler: ActionHandler)

Set the command handler.

```typescript
command.action(async (opts, ...args) => {
  // opts contains parsed options (fully typed!)
  // args contains positional arguments
});
```

### .example(command: string, description: string)

Add an example to the command.

```typescript
command.example('my-cli deploy --env prod', 'Deploy to production');
```

### .parse(argv?: string[])

Parse and execute the CLI. Defaults to `process.argv.slice(2)`.

```typescript
app.parse();  // Parse process.argv
app.parse(['deploy', '--env', 'prod']);  // Parse custom args
```

## Examples

See the [examples](./examples) directory for complete working examples:

**TypeScript:**
- [simple.ts](./examples/simple.ts) - Basic TypeScript usage
- [deploy.ts](./examples/deploy.ts) - Full-featured deployment CLI
- [advanced.ts](./examples/advanced.ts) - Complex DevOps CLI

**JavaScript:**
- [simple.js](./examples/simple.js) - Basic JavaScript usage
- [deploy.js](./examples/deploy.js) - Full-featured deployment CLI (JS)
- [api.js](./examples/api.js) - API server CLI (JS)

Run them:

```bash
# TypeScript examples
node examples/simple.ts greet --name Alice
node examples/deploy.ts deploy --env staging --port 8080

# JavaScript examples
node examples/simple.js greet --name "World" --loud
node examples/deploy.js deploy --env staging --port 8080
node examples/api.js start --port 4000 --workers 2
```

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR.

## Roadmap

- [ ] Subcommands (nested commands)
- [ ] Custom validators
- [ ] Config file support
- [ ] Shell completion generation
- [ ] Interactive prompts
- [ ] Color output utilities
- [ ] Progress bars

## Why "Soldier"?

Because it's disciplined, reliable, and gets the job done. Plus, CLI → command → military theme.
