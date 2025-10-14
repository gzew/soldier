#!/usr/bin/env node

/**
 * SOLDIER SHOWCASE - Colorful Demo
 * This demonstrates all of Soldier's amazing features with colors!
 */

import { cli } from '../dist/index.js';
import { c } from './colors.js';

const app = cli('soldier')
  .version('1.0.0')
  .description(c.bold('A modern CLI framework with superpowers'));

// Deploy command - shows validation and type conversion
app
  .command('deploy')
  .description('Deploy application with automatic validation')
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
  .option('--force', {
    type: 'boolean',
    description: 'Force deployment',
  })
  .example('soldier deploy --env production --port 8080', 'Deploy to production')
  .action(async (opts) => {
    console.log('\n' + c.bold(c.cyan('════════════════════════════════════')));
    console.log(c.rocket('DEPLOYING APPLICATION'));
    console.log(c.bold(c.cyan('════════════════════════════════════')) + '\n');

    console.log(c.blue('Environment: ') + c.bold(c.brightCyan(opts.env)));
    console.log(c.blue('Port:        ') + c.bold(c.brightYellow(opts.port)));
    console.log(c.blue('Force:       ') + c.bold(opts.force ? c.green('yes') : c.gray('no')));

    console.log('\n' + c.gray('Validating configuration...'));
    await sleep(400);
    console.log(c.success('Configuration valid'));

    console.log(c.gray('Building application...'));
    await sleep(600);
    console.log(c.success('Build complete'));

    console.log(c.gray('Deploying to ' + opts.env + '...'));
    await sleep(800);

    console.log('\n' + c.success(c.bold('DEPLOYMENT SUCCESSFUL!')));
    console.log(c.dim('  → URL: https://' + opts.env + '.example.com:' + opts.port));
    console.log();
  });

// Build command - shows choices validation
app
  .command('build')
  .description('Build application with automatic type conversion')
  .option('--target <target>', {
    description: 'Build target',
    choices: ['web', 'node', 'electron'],
    default: 'web',
  })
  .option('--minify', {
    type: 'boolean',
    description: 'Minify output',
  })
  .action(async (opts) => {
    console.log('\n' + c.bold(c.magenta('════════════════════════════════════')));
    console.log(c.sparkles('BUILDING APPLICATION'));
    console.log(c.bold(c.magenta('════════════════════════════════════')) + '\n');

    console.log(c.blue('Target:  ') + c.bold(c.brightMagenta(opts.target)));
    console.log(c.blue('Minify:  ') + c.bold(opts.minify ? c.green('yes') : c.gray('no')));

    console.log('\n' + c.gray('Compiling source files...'));
    await sleep(500);
    console.log(c.success('Compiled 127 files'));

    if (opts.minify) {
      console.log(c.gray('Minifying output...'));
      await sleep(600);
      console.log(c.success('Reduced bundle size by 68%'));
    }

    console.log('\n' + c.success(c.bold('BUILD COMPLETE!')));
    console.log(c.dim('  → Output: dist/'));
    console.log(c.dim('  → Size: ' + (opts.minify ? '28 KB' : '87 KB')));
    console.log();
  });

// Test command - shows number validation
app
  .command('test')
  .description('Run tests with automatic number validation')
  .option('--timeout <ms>', {
    type: 'number',
    description: 'Test timeout',
    min: 100,
    max: 60000,
    default: 5000,
  })
  .option('--coverage', {
    type: 'boolean',
    description: 'Generate coverage report',
  })
  .action(async (opts) => {
    console.log('\n' + c.bold(c.green('════════════════════════════════════')));
    console.log(c.success('RUNNING TESTS'));
    console.log(c.bold(c.green('════════════════════════════════════')) + '\n');

    console.log(c.blue('Timeout:  ') + c.bold(c.brightYellow(opts.timeout + 'ms')));
    console.log(c.blue('Coverage: ') + c.bold(opts.coverage ? c.green('yes') : c.gray('no')));

    console.log('\n' + c.gray('Running test suites...'));
    await sleep(600);

    console.log(c.success('Unit tests    (42 passed)'));
    await sleep(200);
    console.log(c.success('Integration   (18 passed)'));
    await sleep(200);
    console.log(c.success('E2E tests     (7 passed)'));

    if (opts.coverage) {
      console.log('\n' + c.blue('Coverage Report:'));
      console.log(c.dim('  Statements: ') + c.green('87.5%'));
      console.log(c.dim('  Branches:   ') + c.green('75.3%'));
      console.log(c.dim('  Functions:  ') + c.green('92.1%'));
    }

    console.log('\n' + c.trophy(c.bold('ALL TESTS PASSED!')));
    console.log();
  });

// Validate command - shows error handling
app
  .command('validate')
  .description('Validate configuration (shows error handling)')
  .option('--config <path>', {
    description: 'Config file path',
    required: true,
  })
  .action(async (opts) => {
    console.log('\n' + c.bold(c.yellow('════════════════════════════════════')));
    console.log(c.info('VALIDATING CONFIGURATION'));
    console.log(c.bold(c.yellow('════════════════════════════════════')) + '\n');

    console.log(c.blue('Config: ') + c.bold(c.cyan(opts.config)));

    console.log('\n' + c.gray('Reading configuration file...'));
    await sleep(400);
    console.log(c.success('Config file found'));

    console.log(c.gray('Checking syntax...'));
    await sleep(400);
    console.log(c.success('Syntax valid'));

    console.log(c.gray('Validating values...'));
    await sleep(400);
    console.log(c.success('All values valid'));

    console.log('\n' + c.success(c.bold('VALIDATION COMPLETE!')));
    console.log(c.dim('  → No errors found'));
    console.log();
  });

app.parse();

// Helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
