#!/usr/bin/env node

/**
 * Cartoon Soldier - 20 Frame Animation
 * Walking and Saluting
 */

import { c } from './colors.js';

// Simple cartoon soldier frames
const frames = [];

// Frame 1-2: Title
frames.push(`

${c.bold(c.brightCyan('        ╔═══════════════════════════╗'))}
${c.bold(c.brightCyan('        ║                           ║'))}
${c.bold(c.brightCyan('        ║     '))}${c.brightYellow('🎖️  SOLDIER  🎖️')}${c.bold(c.brightCyan('     ║'))}
${c.bold(c.brightCyan('        ║                           ║'))}
${c.bold(c.brightCyan('        ╚═══════════════════════════╝'))}

${c.cyan('          Modern CLI Framework')}
`);

frames.push(frames[0]); // Repeat title

// Frame 3-8: Walking (6 frames)
// Walk 1
frames.push(`

              ${c.brightYellow('O')}
             ${c.cyan('/|')}${c.green('\\\\')}
            ${c.cyan('/ |')} ${c.green('\\\\')}
             ${c.gray('_|_')}
            ${c.gray('|   |')}
`);

// Walk 2
frames.push(`

              ${c.brightYellow('O')}
             ${c.cyan('/|')}${c.green('\\\\')}
            ${c.cyan('/')} ${c.cyan('|')} ${c.green('\\\\')}
              ${c.gray('|')}
             ${c.gray('/ \\\\')}
            ${c.gray('|   |')}
`);

// Walk 3
frames.push(`

              ${c.brightYellow('O')}
             ${c.cyan('/|')}${c.green('\\\\')}
              ${c.cyan('|')} ${c.green('\\\\')}
              ${c.gray('|')}
             ${c.gray('/ \\\\')}
            ${c.gray('/   \\\\')}
`);

// Walk 4
frames.push(`

              ${c.brightYellow('O')}
             ${c.cyan('/|')}${c.green('\\\\')}
            ${c.cyan('/ |')} ${c.green('\\\\')}
             ${c.gray('_|_')}
            ${c.gray('|   |')}
`);

// Walk 5
frames.push(`

              ${c.brightYellow('O')}
             ${c.cyan('/|')}${c.green('\\\\')}
            ${c.cyan('/')} ${c.cyan('|')} ${c.green('\\\\')}
              ${c.gray('|')}
             ${c.gray('/ \\\\')}
            ${c.gray('|   |')}
`);

// Walk 6
frames.push(`

              ${c.brightYellow('O')}
             ${c.cyan('/|')}${c.green('\\\\')}
              ${c.cyan('|')} ${c.green('\\\\')}
              ${c.gray('|')}
             ${c.gray('/ \\\\')}
            ${c.gray('/   \\\\')}
`);

// Frame 9-10: Standing
const standing = `

              ${c.brightYellow('O')}
             ${c.cyan('/|')}${c.green('\\\\')}
            ${c.cyan('/ |')} ${c.green('\\\\')}
             ${c.gray('_|_')}
            ${c.gray('/ | \\\\')}
           ${c.gray('|  |  |')}
`;

frames.push(standing);
frames.push(standing);

// Frame 11-14: Saluting (4 frames)
// Raising hand
frames.push(`

              ${c.brightYellow('O')}      ${c.blue('_')}
             ${c.cyan('/|')}${c.green('\\\\')}   ${c.blue('/')}
            ${c.cyan('/ |')} ${c.green('\\\\')}
             ${c.gray('_|_')}
            ${c.gray('/ | \\\\')}
           ${c.gray('|  |  |')}
`);

frames.push(`

              ${c.brightYellow('O')}    ${c.blue('__')}
             ${c.cyan('/|')}${c.green('\\\\')} ${c.blue('/')}
            ${c.cyan('/ |')} ${c.green('\\\\')}
             ${c.gray('_|_')}
            ${c.gray('/ | \\\\')}
           ${c.gray('|  |  |')}
`);

// Full salute
const salute = `

              ${c.brightYellow('O')}  ${c.blue('___')}
             ${c.cyan('/|')}${c.green('\\\\')}${c.blue('|')}
            ${c.cyan('/ |')} ${c.green('\\\\')}
             ${c.gray('_|_')}
            ${c.gray('/ | \\\\')}
           ${c.gray('|  |  |')}
`;

frames.push(salute);
frames.push(salute);

// Frame 15-16: Lower hand
frames.push(`

              ${c.brightYellow('O')}    ${c.blue('__')}
             ${c.cyan('/|')}${c.green('\\\\')} ${c.blue('\\\\')}
            ${c.cyan('/ |')} ${c.green('\\\\')}
             ${c.gray('_|_')}
            ${c.gray('/ | \\\\')}
           ${c.gray('|  |  |')}
`);

frames.push(standing);

// Frame 17-18: Message
frames.push(`

${c.bold(c.brightGreen('    ✓ Zero Dependencies'))}
${c.bold(c.brightGreen('    ✓ Automatic Validation'))}
${c.bold(c.brightGreen('    ✓ Full TypeScript Support'))}

${c.cyan('       npm install soldier')}
`);

frames.push(frames[17]);

// Frame 19-20: Final
frames.push(`

${c.bold(c.brightCyan('        ╔═══════════════════════════╗'))}
${c.bold(c.brightCyan('        ║                           ║'))}
${c.bold(c.brightCyan('        ║     '))}${c.brightYellow('🎖️  SOLDIER  🎖️')}${c.bold(c.brightCyan('     ║'))}
${c.bold(c.brightCyan('        ║                           ║'))}
${c.bold(c.brightCyan('        ╚═══════════════════════════╝'))}

              ${c.brightYellow('O')}  ${c.blue('___')}
             ${c.cyan('/|')}${c.green('\\\\')}${c.blue('|')}
            ${c.cyan('/ |')} ${c.green('\\\\')}
             ${c.gray('_|_')}
            ${c.gray('/ | \\\\')}
           ${c.gray('|  |  |')}

${c.brightGreen('      Ready for duty! 🎖️')}
`);

frames.push(frames[19]);

async function animate() {
  console.clear();

  for (let i = 0; i < frames.length; i++) {
    console.clear();
    console.log('\n\n');
    console.log(frames[i]);

    // Vary timing
    if (i < 2) {
      await sleep(800); // Title
    } else if (i >= 2 && i < 9) {
      await sleep(200); // Walking
    } else if (i >= 9 && i < 11) {
      await sleep(400); // Standing
    } else if (i >= 11 && i < 15) {
      await sleep(400); // Saluting
    } else if (i >= 15 && i < 17) {
      await sleep(400); // Lower hand
    } else if (i >= 17 && i < 19) {
      await sleep(1000); // Message
    } else {
      await sleep(1500); // Final
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

animate();
