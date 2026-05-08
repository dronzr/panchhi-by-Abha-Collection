#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const clientDir = path.join(__dirname, 'dist', 'client');
const assetsDir = path.join(clientDir, 'assets');

// Find the main index-*.js file (the larger one)
const files = fs.readdirSync(assetsDir);
const indexFiles = files.filter(f => f.startsWith('index-') && f.endsWith('.js'));

if (indexFiles.length === 0) {
  console.error('No index-*.js file found!');
  process.exit(1);
}

// Get the largest index file (the main bundle)
const mainBundle = indexFiles.reduce((prev, current) => {
  const prevSize = fs.statSync(path.join(assetsDir, prev)).size;
  const currentSize = fs.statSync(path.join(assetsDir, current)).size;
  return currentSize > prevSize ? current : prev;
});

console.log('Found main bundle:', mainBundle);

// Read and update index.html
const indexPath = path.join(clientDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

// Replace the script src with the correct bundle
html = html.replace(
  /src="\/src\/main\.tsx"/,
  `src="/assets/${mainBundle}"`
);

fs.writeFileSync(indexPath, html);
console.log('Updated index.html with correct bundle reference');
