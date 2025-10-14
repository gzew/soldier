#!/usr/bin/env node

/**
 * Infantry Soldier Animation
 * More detailed soldier with marching, saluting, and rifle
 */

import { c } from './colors.js';

// Standing at attention with rifle
const standingAttention = `
${c.gray('         ___________')}
${c.gray('        /           \\\\')}
${c.brightYellow('       |  ${c.blue('o')}     ${c.blue('o')}  |')}
${c.brightYellow('       |     ${c.red('^')}     |')}
${c.brightYellow('        \\\\   ${c.red('---')}   /')}
${c.brightYellow('         \\\\_____/')}
${c.cyan('        _____|_____')}
${c.cyan('       |     |     |')}
${c.green('       |     |     |')}
${c.green('      /      |      \\\\')}
${c.green('     /       |       \\\\')}
${c.green('    |        |        |')}
${c.green('    |        |        |')}
${c.brightGreen('  _/         |         \\\\_')}
${c.gray(' |__|         |         |__|')}
${c.gray(' |__|        | |        |__|')}
${c.gray('             | |')}
${c.gray('            |   |')}
${c.gray('           |_____|')}
`;

// Saluting
const saluting = `
${c.gray('         ___________')}  ${c.blue('___')}
${c.gray('        /           \\\\')}${c.blue('|   |')}
${c.brightYellow('       |  ${c.blue('o')}     ${c.blue('o')}  |')}
${c.brightYellow('       |     ${c.red('^')}     |')}
${c.brightYellow('        \\\\   ${c.red('---')}   /')}
${c.brightYellow('         \\\\_____/')}
${c.cyan('        _____|_____')}
${c.cyan('       |     |     ')}
${c.green('       |     |     ')}
${c.green('      /      |      \\\\')}
${c.green('     /       |       \\\\')}
${c.green('    |        |        |')}
${c.green('    |        |        |')}
${c.brightGreen('  _/         |         \\\\_')}
${c.gray(' |__|         |         |__|')}
${c.gray(' |__|        | |        |__|')}
${c.gray('             | |')}
${c.gray('            |   |')}
${c.gray('           |_____|')}
`;

// Marching - left foot forward
const marchingLeft = `
${c.gray('         ___________')}
${c.gray('        /           \\\\')}
${c.brightYellow('       |  ${c.blue('o')}     ${c.blue('o')}  |')}
${c.brightYellow('       |     ${c.red('^')}     |')}
${c.brightYellow('        \\\\   ${c.red('---')}   /')}
${c.brightYellow('         \\\\_____/')}
${c.cyan('        _____|_____')}
${c.cyan('       |     |     |')}
${c.green('    \\\\ /     |     ')}
${c.green('     X      |      ')}
${c.green('    / \\\\     |       \\\\')}
${c.green('   |   |    |        |')}
${c.green('   |   |    |        |')}
${c.brightGreen('  _|   |    |         \\\\_')}
${c.gray(' |__|  |    |         |__|')}
${c.gray('       |   | |        |__|')}
${c.gray('       |   | |')}
${c.gray('      |___||   |')}
${c.gray('           |_____|')}
`;

// Marching - right foot forward
const marchingRight = `
${c.gray('         ___________')}
${c.gray('        /           \\\\')}
${c.brightYellow('       |  ${c.blue('o')}     ${c.blue('o')}  |')}
${c.brightYellow('       |     ${c.red('^')}     |')}
${c.brightYellow('        \\\\   ${c.red('---')}   /')}
${c.brightYellow('         \\\\_____/')}
${c.cyan('        _____|_____')}
${c.cyan('       |     |     |')}
${c.green('             |     \\\\ /')}
${c.green('             |      X')}
${c.green('      /      |     / \\\\')}
${c.green('     /       |    |   |')}
${c.green('    |        |    |   |')}
${c.brightGreen('  _/         |    |   |_')}
${c.gray(' |__|         |    |  |__|')}
${c.gray(' |__|        | |   |')}
${c.gray('             | |   |')}
${c.gray('            |   |___|')}
${c.gray('           |_____|')}
`;

// With rifle - standing
const withRifle = `
${c.gray('         ___________')}
${c.gray('        /           \\\\')}  ${c.dim('━━━━━')}
${c.brightYellow('       |  ${c.blue('o')}     ${c.blue('o')}  |')} ${c.dim('━━━━━━')}
${c.brightYellow('       |     ${c.red('^')}     |')}${c.dim('━')}
${c.brightYellow('        \\\\   ${c.red('---')}   /')}
${c.brightYellow('         \\\\_____/')}
${c.cyan('        _____|_____')}
${c.cyan('       |     |     |')}
${c.green('       |     |     |')}
${c.green('      /      |      \\\\')}
${c.green('     /       |       \\\\')}
${c.green('    |        |        |')}
${c.green('    |        |        |')}
${c.brightGreen('  _/         |         \\\\_')}
${c.gray(' |__|         |         |__|')}
${c.gray(' |__|        | |        |__|')}
${c.gray('             | |')}
${c.gray('            |   |')}
${c.gray('           |_____|')}
`;

// Title card
const titleCard = `
${c.bold(c.brightCyan('╔═══════════════════════════════════════╗'))}
${c.bold(c.brightCyan('║                                       ║'))}
${c.bold(c.brightCyan('║         '))}${c.brightYellow('🎖️  SOLDIER  🎖️')}${c.bold(c.brightCyan('          ║'))}
${c.bold(c.brightCyan('║                                       ║'))}
${c.bold(c.brightCyan('║   '))}${c.brightGreen('Modern CLI Framework for Node.js')}${c.bold(c.brightCyan('  ║'))}
${c.bold(c.brightCyan('║                                       ║'))}
${c.bold(c.brightCyan('╚═══════════════════════════════════════╝'))}
`;

const features = `
${c.bold(c.brightCyan('═════════════════════════════════════════'))}

${c.brightGreen('✓')} ${c.green('Zero Dependencies')}
${c.brightGreen('✓')} ${c.green('Automatic Validation')}
${c.brightGreen('✓')} ${c.green('Type Conversion')}
${c.brightGreen('✓')} ${c.green('Full TypeScript Support')}
${c.brightGreen('✓')} ${c.green('68% Smaller than Commander')}

${c.bold(c.brightCyan('═════════════════════════════════════════'))}

${c.cyan('         npm install soldier')}

${c.dim('         Ready for duty! 🎖️')}
`;

async function animate() {
  console.clear();

  // Show title
  console.log('\n\n');
  console.log(titleCard);
  await sleep(1200);

  // Standing at attention
  console.clear();
  console.log('\n');
  console.log(c.bold(c.brightCyan('     INFANTRY SOLDIER - AT ATTENTION')));
  console.log(standingAttention);
  await sleep(1200);

  // With rifle
  console.clear();
  console.log('\n');
  console.log(c.bold(c.brightCyan('     INFANTRY SOLDIER - ARMED')));
  console.log(withRifle);
  await sleep(1200);

  // March animation
  for (let i = 0; i < 3; i++) {
    console.clear();
    console.log('\n');
    console.log(c.bold(c.brightCyan('     INFANTRY SOLDIER - MARCHING')));
    console.log(marchingLeft);
    await sleep(300);

    console.clear();
    console.log('\n');
    console.log(c.bold(c.brightCyan('     INFANTRY SOLDIER - MARCHING')));
    console.log(marchingRight);
    await sleep(300);
  }

  // Salute
  console.clear();
  console.log('\n');
  console.log(c.bold(c.brightCyan('     INFANTRY SOLDIER - SALUTING')));
  console.log(saluting);
  await sleep(1500);

  // Show features
  console.clear();
  console.log('\n\n');
  console.log(features);
  await sleep(2500);

  // Final frame with soldier
  console.clear();
  console.log('\n');
  console.log(titleCard);
  console.log(saluting);
  console.log('\n');
  console.log(c.bold(c.brightGreen('              Ready for duty! 🎖️')));
  console.log('\n');
  console.log(c.cyan('              npm install soldier'));
  console.log('\n');
  await sleep(2000);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

animate();
