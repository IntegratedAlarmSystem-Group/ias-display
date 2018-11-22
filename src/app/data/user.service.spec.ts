import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientService } from '../data/http-client.service';
import { UserService, User } from './user.service';
import { BackendUrls } from '../settings';

let subject: UserService;
let httpClient: HttpClientService;

const usersFromWebServer = [
  {
    'username': 'user_1',
    'email': 'email@email.cl'
  },
  {
    'username': 'user_2',
    'email': 'email@email.cl'
  },
  {
    'username': 'user_3',
    'email': 'email@email.cl'
  }
];


describe('UserService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserService, HttpClient, HttpClientService]
    });
  });

  beforeEach(
    inject([UserService, HttpClientService],
      (userService: UserService, httpClientService: HttpClientService) => {
        subject = userService;
        httpClient = httpClientService;

        /**
        * Redefinition of get http method
        */
        spyOn(httpClient, 'get').and.returnValue(
            of(usersFromWebServer)
        );
    })
  );

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  describe('Have a method to get the users list AND WHEN it is called', () => {
    it('the users list is updated', () => {
      /* Act */
      subject.requestUsersList();
      /* Assert */
      expect(httpClient.get).toHaveBeenCalledWith(BackendUrls.USERS_LIST);
      expect(subject.users).toEqual(<User[]> usersFromWebServer);
    });
  });
});
