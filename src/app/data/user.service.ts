import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { BackendUrls } from '../settings';

/**
* Class that models a User
**/
export interface User {
  /** Unique username */
  username: string;

  /** Optional email */
  email: string;
}

/**
* Service to manage information about user accounts
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
  * @return {User[]} the list of users
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
