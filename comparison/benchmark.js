#!/usr/bin/env node

/**
 * Performance Benchmark: Soldier vs Commander
 * Measures parse time over 1000 iterations
 */

// Soldier
import { cli as soldierCli } from '../dist/index.js';

// Commander
import { program } from 'commander';

function benchmarkSoldier() {
  const app = soldierCli('bench')
    .version('1.0.0');

  app
    .command('test')
    .option('--env <env>', {
      choices: ['prod', 'dev'] as const,
      required: true,
    })
    .option('--port <port>', {
      type: 'number',
      min: 1,
      max: 65535,
    })
    .action(() => {});

  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    app.parse(['test', '--env', 'prod', '--port', '3000']).catch(() => {});
  }
  const end = performance.now();

  return end - start;
}

function benchmarkCommander() {
  const start = performance.now();

  for (let i = 0; i < 1000; i++) {
    // Reset program for each iteration
    const prog = program
      .exitOverride() // Prevent exit in benchmark
      .version('1.0.0');

    prog
      .command('test')
      .requiredOption('--env <env>')
      .option('--port <port>')
      .action(() => {});

    try {
      prog.parse(['node', 'test', 'test', '--env', 'prod', '--port', '3000'], { from: 'user' });
    } catch (e) {
      // Ignore errors
    }
  }

  const end = performance.now();
  return end - start;
}

console.log('🏁 Benchmark: Parse 1000 commands\n');

console.log('⏱️  Soldier...');
const soldierTime = benchmarkSoldier();
console.log(`   Time: ${soldierTime.toFixed(2)}ms\n`);

console.log('⏱️  Commander...');
const commanderTime = benchmarkCommander();
console.log(`   Time: ${commanderTime.toFixed(2)}ms\n`);

const faster = soldierTime < commanderTime ? 'Soldier' : 'Commander';
const diff = Math.abs(commanderTime - soldierTime);
const percent = ((diff / Math.max(soldierTime, commanderTime)) * 100).toFixed(1);

console.log(`🏆 Winner: ${faster}`);
console.log(`   ${percent}% faster\n`);
