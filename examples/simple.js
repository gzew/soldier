#!/usr/bin/env node

/**
 * JAVASCRIPT EXAMPLE - Simple CLI
 * Soldier works perfectly with plain JavaScript!
 */

import { cli } from '../dist/index.js';

const app = cli('myapp')
  .version('1.0.0')
  .description('Simple JavaScript CLI');

// Greet command
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

// Math command
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
    // Numbers are automatically parsed!
    const result = opts.a + opts.b;
    console.log(`${opts.a} + ${opts.b} = ${result}`);
  });

app.parse();
