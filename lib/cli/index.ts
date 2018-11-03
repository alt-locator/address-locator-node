import * as loglevel from 'loglevel';
import * as yargs from 'yargs';
import * as update from './update';

const log = loglevel.getLogger('address-locator-node');
log.setLevel('info');

const BASE_PATH = 'base_path';
const basePathOption: yargs.Options = {
  describe: 'The base path in firebase.',
  type: 'string'
};

const NAME = 'name';
const nameOption: yargs.Options = {
  describe: 'The name of this device.',
  type: 'string'
};

const SERVICE_ACCOUNT_JSON = 'service_account_json';
const serviceAccountJsonOption: yargs.Options = {
  describe: 'The full path to the service account json file.',
  type: 'string'
};

yargs.command('update', 'Update the location.',
  (yargs: yargs.Argv) => {
    return yargs
      .option(BASE_PATH, basePathOption)
      .option(NAME, nameOption)
      .option(SERVICE_ACCOUNT_JSON, serviceAccountJsonOption);
  }, (argv: yargs.Arguments) => {
    update.handler(argv);
  })
  .help()
  .argv;