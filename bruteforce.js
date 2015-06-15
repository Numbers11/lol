//NOT YET FUNCTIONAL
var CheckAcc = require('./lolcheck.js')
var chalk = require('chalk')


console.log(chalk.blue.bgYellow.bold('       LoL Account Bruteforce       '))
program
  .version('0.0.1')
  .option('-r, --requests <n>', 'Max parallel requests', parseInt)
  .option('-t, --timeout <n>', 'Timeout between requests', parseInt)
  .option('-l, --list <n>', 'Wordlist file')
  .parse(process.argv)
 
 if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
  }
  
if (program.requests) console.log(program.requests + '  - requests');
if (program.timeout) console.log(program.timeout + '  - timeout');
if (!program.list) {
    console.log('No wordlist file specified')
    process.exit(1);
}

