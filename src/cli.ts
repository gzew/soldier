import { Command } from './command.js';
import { parseArgs } from './parser.js';
import { OptionConfig } from './types.js';

/**
 * Main CLI class
 */
export class CLI {
  private _name: string;
  private _version: string = '0.0.0';
  private _description: string = '';
  private _commands: Map<string, Command<any>> = new Map();
  private _globalOptions: Record<string, OptionConfig> = {};

  constructor(name: string) {
    this._name = name;

    // Add default help option
    this._globalOptions['help'] = {
      type: 'boolean',
      alias: 'h',
      description: 'Show help',
    };

    // Add default version option
    this._globalOptions['version'] = {
      type: 'boolean',
      alias: 'v',
      description: 'Show version',
    };
  }

  /**
   * Set CLI version
   */
  version(ver: string): this {
    this._version = ver;
    return this;
  }

  /**
   * Set CLI description
   */
  description(desc: string): this {
    this._description = desc;
    return this;
  }

  /**
   * Create a new command
   */
  command(name: string): Command {
    const command = new Command(name);
    this._commands.set(name, command);
    return command;
  }

  /**
   * Parse and execute CLI
   */
  async parse(argv: string[] = process.argv.slice(2)): Promise<void> {
    try {
      // Check for global help/version first
      if (argv.includes('--help') || argv.includes('-h')) {
        if (argv.length === 1) {
          // Global help
          console.log(this.getHelp());
          process.exit(0);
        }
      }

      if (argv.includes('--version') || argv.includes('-v')) {
        console.log(this._version);
        process.exit(0);
      }

      // Find the command
      const commandNames = Array.from(this._commands.keys());
      const commandName = argv.find(arg => commandNames.includes(arg));

      if (!commandName) {
        if (argv.length === 0) {
          console.log(this.getHelp());
          process.exit(0);
        }
        throw new Error(`Unknown command: ${argv[0]}`);
      }

      const command = this._commands.get(commandName)!;

      // Check for command help
      if (argv.includes('--help') || argv.includes('-h')) {
        console.log(command.getHelp(this._name));
        process.exit(0);
      }

      // Parse arguments
      const parsed = parseArgs(argv, commandNames, command.options);

      // Execute command
      await command.execute(parsed.options as any, parsed.args);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error('An unknown error occurred');
      }
      process.exit(1);
    }
  }

  /**
   * Generate global help text
   */
  private getHelp(): string {
    const lines: string[] = [];

    // Name and description
    lines.push(this._name);
    if (this._description) {
      lines.push(this._description);
    }
    lines.push('');

    // Version
    lines.push(`Version: ${this._version}`);
    lines.push('');

    // Usage
    lines.push('Usage:');
    lines.push(`  ${this._name} <command> [options]`);
    lines.push('');

    // Commands
    if (this._commands.size > 0) {
      lines.push('Commands:');
      const commandEntries = Array.from(this._commands.entries());
      const maxLength = Math.max(...commandEntries.map(([name]) => name.length));

      for (const [name, command] of commandEntries) {
        const padding = ' '.repeat(Math.max(2, maxLength - name.length + 4));
        const desc = (command as any)._description || '';
        lines.push(`  ${name}${padding}${desc}`);
      }
      lines.push('');
    }

    // Global options
    lines.push('Global Options:');
    lines.push('  -h, --help       Show help');
    lines.push('  -v, --version    Show version');
    lines.push('');

    // Help hint
    lines.push(`Run '${this._name} <command> --help' for more information on a command.`);

    return lines.join('\n');
  }
}

/**
 * Create a new CLI instance
 */
export function cli(name: string): CLI {
  return new CLI(name);
}
