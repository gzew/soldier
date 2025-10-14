#!/bin/bash

# Demo script for Soldier - Perfect for recording!
# This script shows off all of Soldier's features

clear

echo ""
echo "🎖️  SOLDIER - Modern CLI Framework Demo"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
sleep 2

echo "$ soldier --help"
sleep 1
node demo/showcase.js --help
echo ""
sleep 3

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  1. DEPLOY - Automatic Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
sleep 2

echo ""
echo "$ soldier deploy --env production --port 8080 --force"
sleep 1
node demo/showcase.js deploy --env production --port 8080 --force
sleep 3

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  2. BUILD - Type Conversion"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
sleep 2

echo ""
echo "$ soldier build --target electron --minify"
sleep 1
node demo/showcase.js build --target electron --minify
sleep 3

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  3. TEST - Number Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
sleep 2

echo ""
echo "$ soldier test --timeout 3000 --coverage"
sleep 1
node demo/showcase.js test --timeout 3000 --coverage
sleep 3

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✨ Features:"
echo "     • Zero dependencies"
echo "     • Automatic validation"
echo "     • Type conversion"
echo "     • 68% smaller than Commander"
echo "     • Works with JS & TypeScript"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  npm install soldier"
echo ""
sleep 3
