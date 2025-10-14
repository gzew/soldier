#!/usr/bin/env node

/**
 * Soldier Salute Animation
 * ASCII art soldier saluting
 */

import { c } from './colors.js';

const frames = [
  // Frame 1: Standing
  `
     ${c.yellow('___')}
    ${c.yellow('|o o|')}
    ${c.yellow('| ^ |')}
    ${c.yellow(' ---')}
     ${c.blue('|')}
    ${c.blue('/|')}${c.green('\\\\')}
   ${c.blue('/ |')} ${c.green('\\\\')}
  ${c.gray('_|  |_')}
  `,
  // Frame 2: Raising hand
  `
     ${c.yellow('___')}
    ${c.yellow('|o o|')}
    ${c.yellow('| ^ |')}    ${c.blue('\\\\')}
    ${c.yellow(' ---')}     ${c.blue('|')}
     ${c.blue('|')}
    ${c.blue('/|')}
   ${c.blue('/ |')} ${c.green('\\\\')}
  ${c.gray('_|  |_')}
  `,
  // Frame 3: Saluting!
  `
     ${c.yellow('___')}  ${c.blue('___')}
    ${c.yellow('|o o|')}${c.blue('|')}
    ${c.yellow('| ^ |')}
    ${c.yellow(' ---')}
     ${c.blue('|')}
    ${c.blue('/|')}
   ${c.blue('/ |')} ${c.green('\\\\')}
  ${c.gray('_|  |_')}
  `,
];

const soldierBig = `
${c.brightYellow('        _______________')}
${c.brightYellow('       /               \\\\')}
${c.brightYellow('      |   ${c.blue('o')}       ${c.blue('o')}   |')}
${c.brightYellow('      |       ${c.red('^')}       |')}  ${c.blue('___')}
${c.brightYellow('       \\\\     ${c.red('---')}     /')} ${c.blue('/   \\\\')}
${c.brightYellow('        \\\\___________/')}  ${c.blue('|   |')}
${c.brightCyan('          |     |')}
${c.brightCyan('          |     |')}
${c.brightCyan('         /|     |\\\\')}
${c.green('        / |     | \\\\')}
${c.green('       /  |     |  \\\\')}
${c.gray('     _|___|     |___|_')}
${c.gray('    |_____|     |_____|')}
`;

async function animate() {
  console.clear();

  // Show logo first
  console.log('\n\n');
  console.log(c.bold(c.brightCyan('         🎖️  SOLDIER  🎖️')));
  console.log(c.dim('    Modern CLI Framework'));
  console.log('\n');

  await sleep(800);

  // Animate small soldier
  for (let i = 0; i < 2; i++) {
    for (const frame of frames) {
      console.clear();
      console.log('\n\n');
      console.log(c.bold(c.brightCyan('         🎖️  SOLDIER  🎖️')));
      console.log(c.dim('    Modern CLI Framework'));
      console.log(frame);
      await sleep(400);
    }
  }

  // Show salute longer
  console.clear();
  console.log('\n\n');
  console.log(c.bold(c.brightCyan('         🎖️  SOLDIER  🎖️')));
  console.log(c.dim('    Modern CLI Framework'));
  console.log(frames[2]);
  await sleep(1000);

  // Show big soldier
  console.clear();
  console.log('\n');
  console.log(soldierBig);
  console.log('\n');
  console.log(c.bold(c.brightGreen('         Ready for duty! 🎖️')));
  console.log('\n');
  console.log(c.cyan('         npm install soldier'));
  console.log('\n');
  await sleep(2000);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

animate();
