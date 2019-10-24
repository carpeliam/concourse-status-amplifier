#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const Manifest = require('chrome-manifest');

const root = filename => path.join(__dirname, '..', filename);

const version = require(root('package.json')).version;
const manifest = new Manifest(root('manifest.json'));

manifest.merge({ version });

fs.writeFileSync(root('manifest.json'), manifest.toBuffer());
