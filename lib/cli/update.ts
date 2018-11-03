import * as fs from 'fs';
import * as moment from 'moment';
import * as yargs from 'yargs';
import { FireStore } from '../locator/firestore';
import { Location } from '../locator/location';
import { getExternalIpAddress,
  getLanInterfaces } from '../locator/network_utils';

export async function handler(argv: yargs.Arguments) {
  const name = argv.name;
  const serviceAccountJson = argv.service_account_json;
  const basePath = argv.base_path;
  await update(name, serviceAccountJson, basePath).then(() => {
    process.exit(process.exitCode);
  });
}

export async function update(name: string, serviceAccountJson: string,
    basePath: string): Promise<void> {
  const projectId = JSON.parse(
    fs.readFileSync(serviceAccountJson).toString())['project_id'];
  const databaseUrl = `https://${projectId}.firebaseio.com`;
  const fireStore = new FireStore(basePath, databaseUrl, serviceAccountJson);
  const location: Location = {
    name: name,
    external_ip_address: await getExternalIpAddress(),
    local_ip_address: getLanInterfaces(),
    metadata: {
      project: 'address-locator-node',
      timestamp: moment().format('YYYY-MM-DD hh:mm:ss')
    }
  };
  return fireStore.updateLocation(location);
}