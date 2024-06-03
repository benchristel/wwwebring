#!/usr/bin/env node
import {dirname} from "path"
import {fileURLToPath} from "url"
import {glob} from "glob"
import {getAllTests, runTests, formatTestResultsAsText} from "@benchristel/taste"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

glob(`${__dirname}/**/*.test.js`)
  .then((paths) => Promise.all(paths.map(path => import(path))))
  .then(() => runTests(getAllTests()))
  .then(formatTestResultsAsText)
  .then(console.log)