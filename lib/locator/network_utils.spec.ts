import { getExternalIpAddress, getLanInterfaces } from './network_utils';

describe('network_utils', () => {
  describe('getExternalIpAddress', () => {
    it('should get the external ip address', async() => {
      const externalIpAddress = await getExternalIpAddress();
      const ipAddressRegex = /[0-9]+.[0-9]+.[0-9]+.[0-9]+/g;
      expect(externalIpAddress.match(ipAddressRegex)).toBeTruthy();
    });
  });

  describe('getLanInterfaces', () => {
    it('should have valid lan interfaces', () => {
      const lanInterfaces = getLanInterfaces();
      const macAddressRegex =
        /[a-f0-9]+:[a-f0-9]+:[a-f0-9]+:[a-f0-9]+:[a-f0-9]+:[a-f0-9]+/g;
      const ipAddressRegex = /[0-9]+.[0-9]+.[0-9]+.[0-9]+/g;
      for (const name in lanInterfaces) {
        const macAddress = lanInterfaces[name]['mac_address'];
        const ipAddress = lanInterfaces[name]['local_ip_address'];
        expect(macAddress.match(macAddressRegex)).toBeTruthy();
        expect(ipAddress.match(ipAddressRegex)).toBeTruthy();
      }
    });
  });
});