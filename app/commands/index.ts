import * as commander from 'commander';
import config from '../config/';

const commands = [
  'new',
];

commander.version(config.version);

commands.forEach((command) => {
  const {
    description,
    handle,
    signature,
  } = require(`./${command}`);

  commander
    .command(signature)
    .description(description)
    .action(handle);
});

export default commander;
