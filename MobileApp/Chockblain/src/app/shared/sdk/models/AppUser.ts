/* tslint:disable */

declare var Object: any;
export interface AppUserInterface {
  "name"?: string;
  "username"?: string;
  "email": string;
  "aadhar": string;
  "password": string;
  "faceID": string;
  "publicKey": string;
  "privateKey": string;
  "id"?: any;
}

export class AppUser implements AppUserInterface {
  "name": string;
  "username": string;
  "email": string;
  "aadhar": string;
  "password": string;
  "faceID": string;
  "publicKey": string;
  "privateKey": string;
  "id": any;
  constructor(data?: AppUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AppUser`.
   */
  public static getModelName() {
    return "AppUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AppUser for dynamic purposes.
  **/
  public static factory(data: AppUserInterface): AppUser{
    return new AppUser(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'AppUser',
      plural: 'AppUsers',
      path: 'AppUsers',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "aadhar": {
          name: 'aadhar',
          type: 'string'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
        "faceID": {
          name: 'faceID',
          type: 'string'
        },
        "publicKey": {
          name: 'publicKey',
          type: 'string'
        },
        "privateKey": {
          name: 'privateKey',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
