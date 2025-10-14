/**
 * Simple color utilities for terminal output
 * Zero dependencies - just ANSI codes
 */

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',

  // Colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',

  // Bright colors
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',

  // Background colors
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
};

// Helper functions
export const c = {
  red: (text) => `${colors.red}${text}${colors.reset}`,
  green: (text) => `${colors.green}${text}${colors.reset}`,
  yellow: (text) => `${colors.yellow}${text}${colors.reset}`,
  blue: (text) => `${colors.blue}${text}${colors.reset}`,
  magenta: (text) => `${colors.magenta}${text}${colors.reset}`,
  cyan: (text) => `${colors.cyan}${text}${colors.reset}`,
  gray: (text) => `${colors.gray}${text}${colors.reset}`,

  brightRed: (text) => `${colors.brightRed}${text}${colors.reset}`,
  brightGreen: (text) => `${colors.brightGreen}${text}${colors.reset}`,
  brightYellow: (text) => `${colors.brightYellow}${text}${colors.reset}`,
  brightBlue: (text) => `${colors.brightBlue}${text}${colors.reset}`,
  brightMagenta: (text) => `${colors.brightMagenta}${text}${colors.reset}`,
  brightCyan: (text) => `${colors.brightCyan}${text}${colors.reset}`,

  bold: (text) => `${colors.bold}${text}${colors.reset}`,
  dim: (text) => `${colors.dim}${text}${colors.reset}`,

  // Special formatters
  success: (text) => `${colors.brightGreen}✓${colors.reset} ${colors.green}${text}${colors.reset}`,
  error: (text) => `${colors.brightRed}✗${colors.reset} ${colors.red}${text}${colors.reset}`,
  warning: (text) => `${colors.brightYellow}⚠${colors.reset} ${colors.yellow}${text}${colors.reset}`,
  info: (text) => `${colors.brightBlue}ℹ${colors.reset} ${colors.blue}${text}${colors.reset}`,

  rocket: (text) => `${colors.brightCyan}🚀${colors.reset} ${colors.cyan}${text}${colors.reset}`,
  sparkles: (text) => `${colors.brightYellow}✨${colors.reset} ${colors.yellow}${text}${colors.reset}`,
  fire: (text) => `${colors.brightRed}🔥${colors.reset} ${colors.red}${text}${colors.reset}`,
  trophy: (text) => `${colors.brightYellow}🏆${colors.reset} ${colors.yellow}${text}${colors.reset}`,
};

export default colors;
