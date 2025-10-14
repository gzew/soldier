#!/usr/bin/env node

/**
 * JAVASCRIPT EXAMPLE - Deploy CLI
 * Full validation, type conversion, and choices in plain JavaScript
 */

import { cli } from '../dist/index.js';

const app = cli('deploy')
  .version('1.0.0')
  .description('Deployment tool (JavaScript)');

// Deploy command with full validation
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
  .example('deploy deploy --env staging --port 8080', 'Deploy to staging')
  .action(async (opts) => {
    // All validation is automatic!
    // Numbers are already parsed!
    // No manual checking needed!

    console.log('🚀 Deploying (JavaScript)...');
    console.log(`   Environment: ${opts.env}`);
    console.log(`   Port: ${opts.port}`);
    console.log(`   Replicas: ${opts.replicas}`);
    console.log(`   Force: ${opts.force || false}`);

    if (!opts.force && opts.env === 'production') {
      console.log('\n⚠️  Warning: Deploying to production!');
      console.log('   Use --force to skip this warning.');
      return;
    }

    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('\n✅ Deployment successful!');
  });

// Status command
app
  .command('status')
  .description('Check deployment status')
  .option('--env <environment>', {
    description: 'Environment to check',
    choices: ['production', 'staging', 'development'],
  })
  .option('--verbose', {
    type: 'boolean',
    alias: 'v',
    description: 'Show detailed information',
  })
  .action(async (opts) => {
    console.log('📊 Checking status...');
    if (opts.env) {
      console.log(`   Environment: ${opts.env}`);
    } else {
      console.log('   Checking all environments');
    }

    if (opts.verbose) {
      console.log('\n📝 Detailed information:');
      console.log('   - Uptime: 99.9%');
      console.log('   - Response time: 45ms');
      console.log('   - Memory usage: 256MB');
    }

    console.log('\n✅ All systems operational');
  });

app.parse();
