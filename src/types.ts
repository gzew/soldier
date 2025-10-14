/**
 * Extract option name from flags string
 * e.g. "--env <value>" => "env", "-e, --env" => "env"
 */
export type ExtractOptionName<T extends string> =
  T extends `${infer _}-${infer _} --${infer Name} ${infer _}`
    ? Name
    : T extends `--${infer Name} ${infer _}`
    ? Name
    : T extends `--${infer Name}`
    ? Name
    : never;

/**
 * Option types
 */
export type OptionType = 'string' | 'number' | 'boolean';

/**
 * Base option configuration
 */
export interface BaseOptionConfig {
  description?: string;
  default?: any;
  required?: boolean;
  alias?: string;
}

/**
 * String option configuration
 */
export interface StringOptionConfig extends BaseOptionConfig {
  type?: 'string';
  choices?: readonly string[];
}

/**
 * Number option configuration
 */
export interface NumberOptionConfig extends BaseOptionConfig {
  type: 'number';
  min?: number;
  max?: number;
}

/**
 * Boolean option configuration
 */
export interface BooleanOptionConfig extends BaseOptionConfig {
  type?: 'boolean';
}

/**
 * Union of all option configs
 */
export type OptionConfig = StringOptionConfig | NumberOptionConfig | BooleanOptionConfig;

/**
 * Infer the TypeScript type from an option config
 */
export type InferOptionType<T extends OptionConfig> =
  T extends { type: 'number' }
    ? number
    : T extends { type: 'boolean' }
    ? boolean
    : T extends { choices: readonly (infer U)[] }
    ? U
    : string;

/**
 * Make option required or optional based on config
 */
export type MakeOptional<T extends OptionConfig, V> =
  T extends { required: true }
    ? V
    : T extends { default: any }
    ? V
    : V | undefined;

/**
 * Convert option config to final type
 */
export type OptionToType<T extends OptionConfig> = MakeOptional<T, InferOptionType<T>>;

/**
 * Convert options map to parsed result type
 */
export type OptionsToType<T extends Record<string, OptionConfig>> = {
  [K in keyof T]: OptionToType<T[K]>;
};

/**
 * Command action handler
 */
export type ActionHandler<T extends Record<string, OptionConfig>> = (
  options: OptionsToType<T>,
  ...args: string[]
) => void | Promise<void>;

/**
 * Parsed arguments
 */
export interface ParsedArgs {
  command?: string;
  options: Record<string, any>;
  args: string[];
}
