#!/usr/bin/env node

/**
 * JAVASCRIPT EXAMPLE - API Server CLI
 * Advanced example showing complex validation in plain JavaScript
 */

import { cli } from '../dist/index.js';

const app = cli('api')
  .version('2.0.0')
  .description('API Server CLI (JavaScript)');

// Start server
app
  .command('start')
  .description('Start API server')
  .option('-p, --port <port>', {
    type: 'number',
    description: 'Server port',
    min: 1024,
    max: 65535,
    default: 3000,
  })
  .option('-h, --host <host>', {
    description: 'Host address',
    default: 'localhost',
  })
  .option('--ssl', {
    type: 'boolean',
    description: 'Enable HTTPS',
  })
  .option('--log-level <level>', {
    description: 'Logging level',
    choices: ['error', 'warn', 'info', 'debug'],
    default: 'info',
  })
  .option('--workers <count>', {
    type: 'number',
    description: 'Number of workers',
    min: 1,
    max: 16,
    default: 1,
  })
  .example('api start', 'Start with defaults')
  .example('api start -p 8080 --ssl', 'Start HTTPS on port 8080')
  .example('api start --workers 4', 'Start with 4 workers')
  .action(async (opts) => {
    const protocol = opts.ssl ? 'https' : 'http';
    const url = `${protocol}://${opts.host}:${opts.port}`;

    console.log('🚀 Starting API server...');
    console.log(`   URL: ${url}`);
    console.log(`   Workers: ${opts.workers}`);
    console.log(`   Log level: ${opts['log-level']}`);

    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`\n✅ Server running at ${url}`);
    console.log('   Press Ctrl+C to stop');
  });

// Database command
app
  .command('db')
  .description('Database operations')
  .option('--action <action>', {
    description: 'Database action',
    choices: ['migrate', 'seed', 'reset', 'backup'],
    required: true,
  })
  .option('--env <environment>', {
    description: 'Environment',
    choices: ['production', 'staging', 'development'],
    default: 'development',
  })
  .option('--force', {
    type: 'boolean',
    description: 'Skip confirmation',
  })
  .action(async (opts) => {
    console.log(`🗄️  Database ${opts.action}`);
    console.log(`   Environment: ${opts.env}`);

    if (!opts.force && opts.env === 'production') {
      console.log('\n⚠️  Warning: This will affect production!');
      console.log('   Use --force to proceed');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`\n✅ ${opts.action} completed`);
  });

// Test command
app
  .command('test')
  .description('Run API tests')
  .option('--watch', {
    type: 'boolean',
    alias: 'w',
    description: 'Watch mode',
  })
  .option('--coverage', {
    type: 'boolean',
    description: 'Generate coverage',
  })
  .option('--timeout <ms>', {
    type: 'number',
    description: 'Test timeout',
    min: 100,
    max: 60000,
    default: 5000,
  })
  .action(async (opts) => {
    console.log('🧪 Running tests...');
    console.log(`   Timeout: ${opts.timeout}ms`);
    if (opts.watch) {
      console.log('   Mode: Watch');
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('\n✅ All tests passed!');

    if (opts.coverage) {
      console.log('\n📊 Coverage:');
      console.log('   Statements: 87.5%');
      console.log('   Branches: 75.3%');
      console.log('   Functions: 92.1%');
    }
  });

app.parse();
