#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('rollback')
  .description('rollback solution')
  .action(() => {
      require('../lib/rollback.js')();
  });

program.parse(process.argv);
