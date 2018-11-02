import * as path from 'path';
import {FireStore} from './firestore';
import {Location} from './location';

describe('firestore', () => {
  it('E2E', async () => {
    let serviceAccountJson = path.resolve('serviceAccount.json');
    let fireStorage = new FireStore('alt_test',
      'https://mister-roboto-info.firebaseio.com',
      serviceAccountJson);

    // Update location.
    const location: Location = {
      name: 'foobar',
      external_ip_address: '1.2.3.4'
    }
    await fireStorage.updateLocation(location);

    // Get location.
    let savedLocation = await fireStorage.getLocation(location.name);
    expect(savedLocation.name).toBe(location.name);
    expect(savedLocation.external_ip_address)
      .toBe(location.external_ip_address);

    // Remove location.
    await fireStorage.removeLocation(location.name);
    let removedLocation = await fireStorage.getLocation(location.name);
    expect(removedLocation).toBe(null);
  });
});