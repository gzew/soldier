#!/usr/bin/env node

/**
 * Example: Simple CLI
 * Demonstrates basic usage
 */

import { cli } from '../dist/index.js';

const app = cli('simple')
  .version('1.0.0')
  .description('A simple CLI example');

app
  .command('greet')
  .description('Greet someone')
  .option('--name <name>', {
    description: 'Name to greet',
    required: true,
  })
  .option('--loud', {
    type: 'boolean',
    description: 'Use uppercase',
  })
  .action((opts) => {
    let greeting = `Hello, ${opts.name}!`;
    if (opts.loud) {
      greeting = greeting.toUpperCase();
    }
    console.log(greeting);
  });

app
  .command('add')
  .description('Add two numbers')
  .option('--a <number>', {
    type: 'number',
    description: 'First number',
    required: true,
  })
  .option('--b <number>', {
    type: 'number',
    description: 'Second number',
    required: true,
  })
  .action((opts) => {
    const result = opts.a + opts.b;
    console.log(`${opts.a} + ${opts.b} = ${result}`);
  });

app.parse();
