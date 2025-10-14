#!/usr/bin/env node

/**
 * Quick test to verify the package works
 */

import { cli } from './dist/index.js';

const app = cli('test')
  .version('1.0.0')
  .description('Test CLI');

app
  .command('demo')
  .description('Demo command')
  .option('--name <name>', {
    required: true,
    description: 'Your name'
  })
  .option('--age <age>', {
    type: 'number',
    min: 0,
    max: 150
  })
  .action((opts) => {
    console.log(`✅ Soldier is working!`);
    console.log(`   Name: ${opts.name}`);
    if (opts.age) {
      console.log(`   Age: ${opts.age}`);
    }
  });

app.parse();
