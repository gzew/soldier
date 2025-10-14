#!/usr/bin/env node

/**
 * SOLDIER EXAMPLE
 * Identical CLI built with Soldier
 */

import { cli } from '../dist/index.js';

const app = cli('deploy')
  .version('1.0.0')
  .description('Deployment tool');

app
  .command('deploy')
  .description('Deploy application')
  .option('--env <environment>', {
    description: 'Target environment',
    choices: ['production', 'staging', 'development'] as const,
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
  .action(async (opts) => {
    // TypeScript knows the exact types:
    // opts.env: 'production' | 'staging' | 'development'
    // opts.port: number
    // opts.replicas: number
    // opts.force: boolean | undefined

    console.log('✅ Soldier: Deploying...');
    console.log(`   Environment: ${opts.env}`);
    console.log(`   Port: ${opts.port}`);
    console.log(`   Replicas: ${opts.replicas}`);
    console.log(`   Force: ${opts.force || false}`);

    // Demonstrate type safety - this would error at compile time:
    // const x: number = opts.env; // TS Error: Type 'string' is not assignable to type 'number'
  });

app.parse();
