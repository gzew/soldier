#!/usr/bin/env node

/**
 * COMMANDER EXAMPLE
 * Identical CLI built with Commander
 */

import { program } from 'commander';

program
  .version('1.0.0')
  .description('Deployment tool');

program
  .command('deploy')
  .description('Deploy application')
  .requiredOption('--env <environment>', 'Target environment')
  .option('--port <port>', 'Port number', '3000')
  .option('--replicas <count>', 'Number of replicas', '1')
  .option('--force', 'Force deployment')
  .action((opts) => {
    // TypeScript doesn't know the types - everything is 'any' or needs manual typing
    // opts.env: any
    // opts.port: any (string from CLI)
    // opts.replicas: any (string from CLI)
    // opts.force: any (boolean)

    // Manual validation required
    const validEnvs = ['production', 'staging', 'development'];
    if (!validEnvs.includes(opts.env)) {
      console.error(`Error: Invalid environment. Must be one of: ${validEnvs.join(', ')}`);
      process.exit(1);
    }

    // Manual type conversion required
    const port = parseInt(opts.port);
    if (isNaN(port) || port < 1 || port > 65535) {
      console.error('Error: Port must be a number between 1 and 65535');
      process.exit(1);
    }

    const replicas = parseInt(opts.replicas);
    if (isNaN(replicas) || replicas < 1 || replicas > 10) {
      console.error('Error: Replicas must be a number between 1 and 10');
      process.exit(1);
    }

    console.log('✅ Commander: Deploying...');
    console.log(`   Environment: ${opts.env}`);
    console.log(`   Port: ${port}`);
    console.log(`   Replicas: ${replicas}`);
    console.log(`   Force: ${opts.force || false}`);

    // No type safety - this would NOT error at compile time:
    // const x: number = opts.env; // No error, but runtime bug!
  });

program.parse();
