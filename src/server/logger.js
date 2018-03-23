/* eslint-disable no-console */
import chalk from 'chalk';

module.exports = {
  error: err => console.error(chalk.red(err)),

  log: msg => console.log(chalk.blue(msg)),

  appStarted: (port, host) => {
    console.log(`Starting ...  ${chalk.green('✓')}`);
    console.log(`${chalk.magenta(`http://${host}:${port}`)}`);
  },
};
