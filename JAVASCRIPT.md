# Using Soldier with JavaScript

Soldier works **perfectly** with plain JavaScript! You get all the same features as TypeScript users, just without the type annotations.

## Quick Start (JavaScript)

```javascript
import { cli } from 'soldier';

const app = cli('myapp')
  .version('1.0.0')
  .description('My CLI');

app
  .command('deploy')
  .option('--env <environment>', {
    choices: ['production', 'staging', 'development'],
    required: true,
  })
  .option('--port <port>', {
    type: 'number',
    min: 1,
    max: 65535,
    default: 3000,
  })
  .action((opts) => {
    // opts.env is validated to be one of the choices
    // opts.port is already a number (not a string!)
    console.log(`Deploying to ${opts.env}:${opts.port}`);
  });

app.parse();
```

## All Features Work in JavaScript

### ✅ Automatic Type Conversion

```javascript
.option('--count <n>', {
  type: 'number'  // Automatically converts to number
})
.action((opts) => {
  opts.count + 10  // Already a number!
})
```

### ✅ Built-in Validation

```javascript
.option('--port <port>', {
  type: 'number',
  min: 1,
  max: 65535  // Automatic validation!
})
```

### ✅ Choices Validation

```javascript
.option('--env <env>', {
  choices: ['prod', 'dev', 'staging']  // Validates automatically
})
```

### ✅ Required Fields

```javascript
.option('--name <name>', {
  required: true  // Enforced automatically
})
```

### ✅ Default Values

```javascript
.option('--timeout <ms>', {
  type: 'number',
  default: 5000
})
```

### ✅ Boolean Flags

```javascript
.option('--force', {
  type: 'boolean'
})
```

### ✅ Short Aliases

```javascript
.option('-p, --port <port>', {
  type: 'number'
})
// Use: -p 3000 or --port 3000
```

## Complete JavaScript Example

```javascript
#!/usr/bin/env node

import { cli } from 'soldier';

const app = cli('deploy')
  .version('1.0.0')
  .description('Deployment tool');

app
  .command('deploy')
  .description('Deploy application')
  .option('--env <environment>', {
    description: 'Target environment',
    choices: ['production', 'staging', 'development'],
    required: true,
  })
  .option('--port <port>', {
    type: 'number',
    description: 'Port number',
    min: 1,
    max: 65535,
    default: 3000,
  })
  .option('--replicas <count>', {
    type: 'number',
    description: 'Number of replicas',
    min: 1,
    max: 10,
    default: 1,
  })
  .option('--force', {
    type: 'boolean',
    description: 'Force deployment',
  })
  .example('deploy deploy --env production', 'Deploy to production')
  .action(async (opts) => {
    console.log('🚀 Deploying...');
    console.log(`   Environment: ${opts.env}`);
    console.log(`   Port: ${opts.port}`);
    console.log(`   Replicas: ${opts.replicas}`);
    console.log(`   Force: ${opts.force || false}`);

    // All validation happened automatically!
    // No manual parseInt() needed!
    // No manual range checking needed!

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('\n✅ Deployment successful!');
  });

app.parse();
```

## JavaScript vs TypeScript

The only difference is TypeScript gets type inference:

**JavaScript:**
```javascript
.action((opts) => {
  opts.env    // Validated string, but no autocomplete
  opts.port   // Already a number, but editor doesn't know
})
```

**TypeScript:**
```typescript
.option('--env', { choices: ['prod', 'dev'] as const })
.action((opts) => {
  opts.env    // Type: 'prod' | 'dev' | undefined
  opts.port   // Type: number
  // ✅ Full IntelliSense autocomplete!
})
```

## Validation Works the Same

Both JavaScript and TypeScript get automatic validation:

```bash
# Invalid environment
$ myapp deploy --env invalid
Error: Invalid choice: invalid. Must be one of: production, staging, development

# Port out of range
$ myapp deploy --env staging --port 99999
Error: Value 99999 is greater than maximum 65535

# Missing required field
$ myapp deploy --port 3000
Error: Required option --env not provided
```

## Why Use JavaScript?

- ✅ Simpler setup (no TypeScript compiler)
- ✅ Faster development (no compilation step)
- ✅ All validation still works
- ✅ Type conversion still automatic
- ✅ Same bundle size
- ✅ Same performance

## Why Use TypeScript?

- ✅ IntelliSense autocomplete
- ✅ Compile-time type checking
- ✅ Catch errors before runtime
- ✅ Better refactoring
- ✅ Self-documenting code

## Running JavaScript Examples

```bash
# Simple example
node examples/simple.js greet --name "World"
node examples/simple.js add --a 10 --b 20

# Deploy example
node examples/deploy.js deploy --env staging --port 8080

# API example
node examples/api.js start --port 4000 --workers 2
node examples/api.js db --action migrate
```

## CommonJS Support

If you need CommonJS:

```javascript
const { cli } = require('soldier');

const app = cli('myapp')
  .version('1.0.0');

// Everything works the same!
```

## Bottom Line

**Soldier works great with JavaScript!** You get:
- ✅ All the same features
- ✅ Automatic validation
- ✅ Type conversion
- ✅ Clean API
- ✅ Zero dependencies

The only thing you miss is TypeScript's type inference, but all the runtime features work perfectly.
