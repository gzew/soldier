import { OptionConfig, ParsedArgs } from './types.js';

/**
 * Parse command line arguments
 */
export function parseArgs(
  argv: string[],
  commandNames: string[],
  optionsConfig: Record<string, OptionConfig>
): ParsedArgs {
  const result: ParsedArgs = {
    options: {},
    args: [],
  };

  // Find command
  const commandIndex = argv.findIndex(arg => commandNames.includes(arg));
  if (commandIndex !== -1) {
    result.command = argv[commandIndex];
    argv = argv.slice(commandIndex + 1);
  }

  // Create alias map
  const aliasMap = new Map<string, string>();
  for (const [name, config] of Object.entries(optionsConfig)) {
    if (config.alias) {
      aliasMap.set(config.alias, name);
    }
  }

  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];

    // Long option (--option or --option=value)
    if (arg.startsWith('--')) {
      const [rawName, ...valueParts] = arg.slice(2).split('=');
      const name = rawName;
      const config = optionsConfig[name];

      if (!config) {
        throw new Error(`Unknown option: --${name}`);
      }

      // Boolean flag
      if (config.type === 'boolean') {
        result.options[name] = true;
        i++;
        continue;
      }

      // Value option
      let value: string;
      if (valueParts.length > 0) {
        value = valueParts.join('=');
        i++;
      } else {
        if (i + 1 >= argv.length || argv[i + 1].startsWith('-')) {
          throw new Error(`Option --${name} requires a value`);
        }
        value = argv[i + 1];
        i += 2;
      }

      result.options[name] = parseValue(value, config);
      continue;
    }

    // Short option (-o or -o value)
    if (arg.startsWith('-') && arg.length > 1) {
      const shortName = arg.slice(1);
      const name = aliasMap.get(shortName);

      if (!name) {
        throw new Error(`Unknown option: -${shortName}`);
      }

      const config = optionsConfig[name];

      // Boolean flag
      if (config.type === 'boolean') {
        result.options[name] = true;
        i++;
        continue;
      }

      // Value option
      if (i + 1 >= argv.length || argv[i + 1].startsWith('-')) {
        throw new Error(`Option -${shortName} requires a value`);
      }

      result.options[name] = parseValue(argv[i + 1], config);
      i += 2;
      continue;
    }

    // Regular argument
    result.args.push(arg);
    i++;
  }

  // Apply defaults and validate
  for (const [name, config] of Object.entries(optionsConfig)) {
    if (!(name in result.options)) {
      if (config.required) {
        const displayName = config.alias ? `-${config.alias}, --${name}` : `--${name}`;
        throw new Error(`Required option ${displayName} not provided`);
      }
      if (config.default !== undefined) {
        result.options[name] = config.default;
      }
    }
  }

  return result;
}

/**
 * Parse and validate a value based on option config
 */
function parseValue(value: string, config: OptionConfig): any {
  // Number type
  if (config.type === 'number') {
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error(`Invalid number: ${value}`);
    }
    if (config.min !== undefined && num < config.min) {
      throw new Error(`Value ${num} is less than minimum ${config.min}`);
    }
    if (config.max !== undefined && num > config.max) {
      throw new Error(`Value ${num} is greater than maximum ${config.max}`);
    }
    return num;
  }

  // String with choices
  if ('choices' in config && config.choices) {
    if (!config.choices.includes(value)) {
      throw new Error(`Invalid choice: ${value}. Must be one of: ${config.choices.join(', ')}`);
    }
  }

  return value;
}
