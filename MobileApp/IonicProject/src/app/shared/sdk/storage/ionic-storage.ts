/* tslint:disable */
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import {Observable} from "rxjs/Observable";
import { from } from "rxjs/observable/from";


@Injectable()
export class IonicStorage {
  constructor(private storage: Storage) {
  }

    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in localStorage.
     **/
    get(key: string): Observable<any> {
        return from(this.storage.get(key));
    }

    public getStorageAsync(key: string): Promise<any> {
      return this.storage.get(key);
    }

    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    set(key: string, value: any): Observable<any> {
        //return Observable.fromPromise(this.storage.set(key, typeof value === 'object' ? JSON.stringify(value) : value));
        return from(this.storage.set(key, typeof value === 'object' ? JSON.stringify(value) : value));
    }
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    remove(key: string): Observable<any> {
        return from(this.storage.remove(key));
    }
    /**
     * @method parse
     * @param {any} value Input data expected to be JSON
     * @return {void}
     * @description
     * This method will parse the string as JSON if possible, otherwise will
     * return the value itself.
     **/
    private parse(value: any) {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
}
