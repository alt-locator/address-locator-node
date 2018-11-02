import * as firebaseAdmin from 'firebase-admin';
import * as loglevel from 'loglevel';
import {Location} from './location';

const log = loglevel.getLogger('address-locator');

export class FireStore {
  database: firebaseAdmin.database.Database;

  /**
   * 
   * @param basePath 
   * @param databaseUrl 
   * @param serviceAccountJson 
   */
  constructor(public basePath: string, public databaseUrl: string,
      public serviceAccountJson: string) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(this.serviceAccountJson),
      databaseURL: this.databaseUrl
    });
    this.database = firebaseAdmin.database();
  }

  async getLocation(name: string): Promise<Location> {
    log.info(`get location /${this.basePath}/${name}`);
    const locationRef = firebaseAdmin.database().ref(
      `/${this.basePath}/${name}`);
    return locationRef.once('value').then(data => {
      return data.val() as Location;
    })
  }

  /**
   * Update a location to storage.
   * @param saveLocation 
   */
  updateLocation(saveLocation: Location): Promise<void> {
    log.info(`update location /${this.basePath}/${saveLocation.name}`);
    const locationRef = firebaseAdmin.database().ref(
      `/${this.basePath}/${saveLocation.name}`);
    return locationRef.update(saveLocation);
  }

  /**
   * Remove a location from storage.
   * @param name A location name to remove.
   */
  removeLocation(name: string) {
    log.info(`remove location /${this.basePath}/${name}`);
    const locationRef = firebaseAdmin.database().ref(
      `/${this.basePath}/${name}`);
    return locationRef.remove();
  }
}
