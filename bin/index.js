#!/usr/bin/env node

const program = require('commander');

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('rollback')
  .description('rollback solution')
  .option('-n, --num', 'log number')
  .action((cmd) => {
      require('../lib/rollback.js')(cmd);
  });

program.parse(process.argv);
