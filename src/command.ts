import { ActionHandler, OptionConfig, OptionsToType } from './types.js';

/**
 * Represents a CLI command
 */
export class Command<TOptions extends Record<string, OptionConfig> = {}> {
  private _name: string;
  private _description: string = '';
  private _options: TOptions = {} as TOptions;
  private _action?: ActionHandler<TOptions>;
  private _examples: Array<{ command: string; description: string }> = [];

  constructor(name: string) {
    this._name = name;
  }

  /**
   * Set command description
   */
  description(desc: string): this {
    this._description = desc;
    return this;
  }

  /**
   * Add an option to the command
   */
  option<TName extends string, TConfig extends OptionConfig>(
    flags: TName,
    config: TConfig
  ): Command<TOptions & Record<TName, TConfig>> {
    // Parse flags to extract name and alias
    const parts = flags.trim().split(/\s+/);
    let name = '';
    let hasValue = false;

    for (const part of parts) {
      if (part.startsWith('--')) {
        // Extract name from --name or --name=<value> or --name <value>
        const match = part.match(/^--([a-zA-Z0-9-]+)/);
        if (match) {
          name = match[1];
          if (part.includes('<') || part.includes('[')) {
            hasValue = true;
          }
        }
      } else if (part.startsWith('-') && part.length === 2) {
        // Short alias
        config.alias = part.slice(1);
      } else if (part.startsWith('<') || part.startsWith('[')) {
        hasValue = true;
      }
    }

    if (!name) {
      throw new Error(`Invalid option flags: ${flags}`);
    }

    // Infer type from flags if not specified
    if (!config.type && !hasValue) {
      (config as any).type = 'boolean';
    }

    (this._options as any)[name] = config;
    return this as any;
  }

  /**
   * Add an example
   */
  example(command: string, description: string): this {
    this._examples.push({ command, description });
    return this;
  }

  /**
   * Set the action handler
   */
  action(handler: ActionHandler<TOptions>): this {
    this._action = handler;
    return this;
  }

  /**
   * Execute the command
   */
  async execute(options: OptionsToType<TOptions>, args: string[]): Promise<void> {
    if (!this._action) {
      throw new Error(`No action defined for command: ${this._name}`);
    }
    await this._action(options, ...args);
  }

  /**
   * Generate help text
   */
  getHelp(programName: string): string {
    const lines: string[] = [];

    // Description
    if (this._description) {
      lines.push(this._description);
      lines.push('');
    }

    // Usage
    lines.push('Usage:');
    const optionsStr = Object.keys(this._options).length > 0 ? ' [options]' : '';
    lines.push(`  ${programName} ${this._name}${optionsStr}`);
    lines.push('');

    // Options
    if (Object.keys(this._options).length > 0) {
      lines.push('Options:');
      const optionsEntries = Object.entries(this._options);
      const maxLength = Math.max(
        ...optionsEntries.map(([name, config]) => {
          const alias = config.alias ? `-${config.alias}, ` : '';
          const valuePlaceholder = config.type !== 'boolean' ? ' <value>' : '';
          return `${alias}--${name}${valuePlaceholder}`.length;
        })
      );

      for (const [name, config] of optionsEntries) {
        const alias = config.alias ? `-${config.alias}, ` : '    ';
        const valuePlaceholder = config.type !== 'boolean' ? ' <value>' : '';
        const flags = `${alias}--${name}${valuePlaceholder}`;
        const padding = ' '.repeat(Math.max(2, maxLength - flags.length + 4));

        let desc = config.description || '';

        // Add constraints to description
        const constraints: string[] = [];
        if (config.required) constraints.push('required');
        if (config.default !== undefined) constraints.push(`default: ${config.default}`);
        if ('choices' in config && config.choices) {
          constraints.push(`choices: ${config.choices.join(', ')}`);
        }
        if (config.type === 'number') {
          if (config.min !== undefined) constraints.push(`min: ${config.min}`);
          if (config.max !== undefined) constraints.push(`max: ${config.max}`);
        }

        if (constraints.length > 0) {
          desc += ` (${constraints.join(', ')})`;
        }

        lines.push(`  ${flags}${padding}${desc}`);
      }
      lines.push('');
    }

    // Examples
    if (this._examples.length > 0) {
      lines.push('Examples:');
      for (const example of this._examples) {
        lines.push(`  $ ${example.command}`);
        if (example.description) {
          lines.push(`    ${example.description}`);
        }
      }
      lines.push('');
    }

    return lines.join('\n');
  }

  // Getters
  get name(): string {
    return this._name;
  }

  get options(): TOptions {
    return this._options;
  }
}
