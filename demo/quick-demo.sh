#!/bin/bash

# Quick demo for README - shorter version

clear
echo ""
echo "🎖️  SOLDIER"
echo ""
sleep 1

echo "$ soldier deploy --env production --port 8080"
sleep 0.5
node demo/showcase.js deploy --env production --port 8080 --force
sleep 2

echo ""
echo "$ soldier test --timeout 3000 --coverage"
sleep 0.5
node demo/showcase.js test --timeout 3000 --coverage
sleep 2

echo ""
echo "npm install soldier"
sleep 2
