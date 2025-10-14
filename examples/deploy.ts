#!/usr/bin/env node

/**
 * Example: Deploy CLI
 * Demonstrates type-safe options, validation, and choices
 */

import { cli } from '../dist/index.js';

const app = cli('deploy-cli')
  .version('1.0.0')
  .description('A deployment tool with type-safe commands');

// Deploy command with type inference
app
  .command('deploy')
  .description('Deploy application to specified environment')
  .option('--env <environment>', {
    description: 'Target environment',
    choices: ['production', 'staging', 'development'] as const,
    required: true,
  })
  .option('--force', {
    description: 'Force deployment without confirmation',
    type: 'boolean',
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
  .example('deploy-cli deploy --env production --force', 'Deploy to production')
  .example('deploy-cli deploy --env staging --port 8080', 'Deploy to staging on port 8080')
  .action(async (opts) => {
    // opts is fully typed!
    // opts.env is 'production' | 'staging' | 'development'
    // opts.force is boolean | undefined
    // opts.port is number
    // opts.replicas is number

    console.log('🚀 Deploying application...');
    console.log(`   Environment: ${opts.env}`);
    console.log(`   Port: ${opts.port}`);
    console.log(`   Replicas: ${opts.replicas}`);
    console.log(`   Force: ${opts.force ? 'yes' : 'no'}`);

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
    choices: ['production', 'staging', 'development'] as const,
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

// Rollback command
app
  .command('rollback')
  .description('Rollback to previous version')
  .option('--env <environment>', {
    description: 'Environment to rollback',
    choices: ['production', 'staging', 'development'] as const,
    required: true,
  })
  .option('--version <version>', {
    description: 'Version to rollback to',
  })
  .action(async (opts) => {
    console.log('⏮️  Rolling back...');
    console.log(`   Environment: ${opts.env}`);
    console.log(`   Version: ${opts.version || 'previous'}`);

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('\n✅ Rollback complete!');
  });

// Parse and execute
app.parse();
