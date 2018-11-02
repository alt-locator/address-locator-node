import * as https from 'https';
import * as os from 'os';
import {LocalIpAddress} from './location';

/**
 * Finds the external ip address based on ipify's api.
 * @returns The ip address as a promise string value.
 */
export function getExternalIpAddress(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    https.get('https://api.ipify.org', response => {
      if (response.statusCode !== 200) {
        reject(null);
      }
      let content = '';
      response.on('data', (data) => {
        { content += data; }
      });
      response.on('end', () => {
        resolve(content);
      });
    });
  });
}

/**
 * Gets the lan interfaces as a map of iface names associated with
 * the mac address and IPv4 ip address.
 * @returns a LocalIpAddress object.
 */
export function getLanInterfaces(): LocalIpAddress {
  let ifaces = os.networkInterfaces();
  let localIpAddress: LocalIpAddress = {};
  for (let ifacePos in ifaces) {
    ifaces[ifacePos].forEach(iface => {
      if (iface.family === 'IPv4' && !iface.internal) {
        localIpAddress[ifacePos] = {
          local_ip_address: iface.address,
          mac_address: iface.mac
        }
      }
    });
  }
  return localIpAddress;
}