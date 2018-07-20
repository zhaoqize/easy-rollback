#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package').version)
  .usage('<command>')

program
  .command('rollback')
  .description('A Rollback Solution For Git')
  .option('-n, --number', 'show log number')
  .action((number) => {
      require('../lib/rollback.js')(number);
  });

program.parse(process.argv);
