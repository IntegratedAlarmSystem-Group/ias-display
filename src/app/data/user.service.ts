import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClientService } from './http-client.service';
import { BackendUrls } from '../settings';

/**
* Class that models the User
**/
export interface User {
  /** Unique username */
  username: string;

  /** Optional email */
  email: string;
}

/**
* Service that connects and receives {@link Alarm} messages from the
* IAS Webserver through Websockets
*/
@Injectable()
export class UserService {

  /**
  * List of authorized users
  **/
  public users: User[];

  /**
   * Builds an instance of the service
   * @param {HttpClientService} httpClientService Service used to perform HTTP requests
   */
  constructor(
    private httpClientService: HttpClientService
  ) { }

  /**
  * Get the list of users in the operators group
  */
  requestUsersList() {
    return this.httpClientService.get(BackendUrls.USERS_LIST)
    .subscribe (
        (response) => {
            this.users = <User[]> response;
        },
        (error) => {
            console.error('error: ', error);
        }
    );
  }
}
