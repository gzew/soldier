/**
 * Soldier - A modern, type-safe CLI framework with zero dependencies
 *
 * @example
 * ```typescript
 * import { cli } from 'soldier';
 *
 * const app = cli('my-app')
 *   .version('1.0.0')
 *   .description('My awesome CLI');
 *
 * app
 *   .command('deploy')
 *   .description('Deploy to environment')
 *   .option('--env <env>', {
 *     description: 'Environment',
 *     choices: ['prod', 'dev'] as const,
 *     required: true
 *   })
 *   .option('--force', {
 *     description: 'Force deployment'
 *   })
 *   .action(async (opts) => {
 *     console.log('Deploying to', opts.env);
 *   });
 *
 * app.parse();
 * ```
 */

export { cli, CLI } from './cli.js';
export { Command } from './command.js';
export type {
  OptionConfig,
  StringOptionConfig,
  NumberOptionConfig,
  BooleanOptionConfig,
  ActionHandler,
  OptionsToType,
  OptionToType,
  InferOptionType,
} from './types.js';
