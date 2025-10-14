#!/usr/bin/env node

/**
 * Example: Advanced CLI
 * Demonstrates all features including complex validation
 */

import { cli } from '../dist/index.js';

const app = cli('devops')
  .version('2.0.0')
  .description('A DevOps automation tool');

// Database command with multiple options
app
  .command('db')
  .description('Database operations')
  .option('--action <action>', {
    description: 'Database action',
    choices: ['migrate', 'seed', 'reset', 'backup', 'restore'] as const,
    required: true,
  })
  .option('--env <environment>', {
    description: 'Environment',
    choices: ['production', 'staging', 'development', 'test'] as const,
    default: 'development',
  })
  .option('-f, --force', {
    type: 'boolean',
    description: 'Skip confirmation prompts',
  })
  .option('--backup-file <path>', {
    description: 'Backup file path (for restore action)',
  })
  .example('devops db --action migrate --env production', 'Run migrations in production')
  .example('devops db --action backup --env production', 'Backup production database')
  .example('devops db --action restore --backup-file backup.sql --force', 'Restore from backup')
  .action(async (opts) => {
    console.log(`🗄️  Database ${opts.action}`);
    console.log(`   Environment: ${opts.env}`);

    if (opts.action === 'restore' && !opts.backupFile) {
      console.error('❌ Error: --backup-file required for restore action');
      process.exit(1);
    }

    if (!opts.force && (opts.env === 'production' || opts.action === 'reset')) {
      console.log('\n⚠️  Warning: This is a destructive operation!');
      console.log('   Use --force to proceed');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`\n✅ ${opts.action} completed successfully`);
  });

// Server command with complex options
app
  .command('server')
  .description('Start development server')
  .option('-p, --port <port>', {
    type: 'number',
    description: 'Port number',
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
  .option('--workers <count>', {
    type: 'number',
    description: 'Number of worker processes',
    min: 1,
    max: 16,
    default: 1,
  })
  .option('--log-level <level>', {
    description: 'Logging level',
    choices: ['error', 'warn', 'info', 'debug', 'trace'] as const,
    default: 'info',
  })
  .example('devops server', 'Start server with defaults')
  .example('devops server -p 8080 --ssl', 'Start HTTPS server on port 8080')
  .example('devops server --workers 4 --log-level debug', 'Start with 4 workers and debug logging')
  .action(async (opts) => {
    const protocol = opts.ssl ? 'https' : 'http';
    const url = `${protocol}://${opts.host}:${opts.port}`;

    console.log('🚀 Starting server...');
    console.log(`   URL: ${url}`);
    console.log(`   Workers: ${opts.workers}`);
    console.log(`   Log Level: ${opts.logLevel}`);

    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`\n✅ Server running at ${url}`);
  });

// Build command with optimization options
app
  .command('build')
  .description('Build for production')
  .option('--target <target>', {
    description: 'Build target',
    choices: ['web', 'node', 'electron', 'mobile'] as const,
    default: 'web',
  })
  .option('--minify', {
    type: 'boolean',
    description: 'Minify output',
  })
  .option('--sourcemaps', {
    type: 'boolean',
    description: 'Generate source maps',
  })
  .option('-o, --output <dir>', {
    description: 'Output directory',
    default: 'dist',
  })
  .option('--analyze', {
    type: 'boolean',
    description: 'Analyze bundle size',
  })
  .option('--parallel <jobs>', {
    type: 'number',
    description: 'Number of parallel jobs',
    min: 1,
    max: 8,
  })
  .example('devops build', 'Build with defaults')
  .example('devops build --minify --sourcemaps', 'Build optimized with sourcemaps')
  .example('devops build --target electron --analyze', 'Build for Electron and analyze')
  .action(async (opts) => {
    console.log('🔨 Building...');
    console.log(`   Target: ${opts.target}`);
    console.log(`   Output: ${opts.output}`);
    console.log(`   Minify: ${opts.minify ? 'yes' : 'no'}`);
    console.log(`   Sourcemaps: ${opts.sourcemaps ? 'yes' : 'no'}`);

    if (opts.parallel) {
      console.log(`   Parallel jobs: ${opts.parallel}`);
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    if (opts.analyze) {
      console.log('\n📊 Bundle Analysis:');
      console.log('   Total size: 245 KB');
      console.log('   Gzipped: 89 KB');
      console.log('   Largest chunk: vendor.js (156 KB)');
    }

    console.log('\n✅ Build completed successfully');
  });

// Test command
app
  .command('test')
  .description('Run tests')
  .option('--watch', {
    type: 'boolean',
    alias: 'w',
    description: 'Watch mode',
  })
  .option('--coverage', {
    type: 'boolean',
    description: 'Generate coverage report',
  })
  .option('--reporter <reporter>', {
    description: 'Test reporter',
    choices: ['default', 'verbose', 'json', 'junit'] as const,
    default: 'default',
  })
  .option('--bail', {
    type: 'boolean',
    description: 'Stop on first failure',
  })
  .action(async (opts) => {
    console.log('🧪 Running tests...');
    if (opts.watch) {
      console.log('   Mode: Watch');
    }
    if (opts.coverage) {
      console.log('   Coverage: Enabled');
    }
    console.log(`   Reporter: ${opts.reporter}`);

    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('\n✅ All tests passed (42 tests, 0 failures)');

    if (opts.coverage) {
      console.log('\n📊 Coverage:');
      console.log('   Statements: 87.5%');
      console.log('   Branches: 75.3%');
      console.log('   Functions: 92.1%');
      console.log('   Lines: 86.8%');
    }
  });

app.parse();
