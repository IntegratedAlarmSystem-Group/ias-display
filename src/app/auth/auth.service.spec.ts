import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { DataModule } from '../data/data.module';
import { AuthService } from './auth.service';
import { BackendUrls } from '../settings';
import { environment } from '../../environments/environment';

let service: AuthService;
let httpClient: HttpClient;
const username = 'myUsername';
const password = 'myPassword';
const token = 'thisIsAFakeToken';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DataModule
      ],
      providers: [AuthService]
    });
  });

  beforeEach(inject([AuthService, HttpClient], (authService, httpService) => {
      service = authService;
      httpClient = httpService;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should have a login method that receives a username and a password,', () => {
    // Arrange:
    const url = `${environment.httpUrl}${BackendUrls.TOKEN}`;
    const data = {
      username: username,
      password: password,
    };
    describe('such that when the credentials are valid,', () => {
      it('it requests a token, saves the token and the user in the local storage and sends a true in the loginStatusStream,', async(() => {
        // Arrange:
        service.removeUser();
        service.removeToken();
        spyOn(httpClient, 'post').and.returnValue(of({token: token}));
        // Act:
        service.login(username, password).subscribe((response) => {
          // Assert:
          expect(httpClient.post).toHaveBeenCalledWith(url, data);
          const retrievedToken = localStorage.getItem('token');
          expect(retrievedToken).toEqual(JSON.stringify(token));
          const retrievedUser = localStorage.getItem('user');
          expect(retrievedUser).toEqual(JSON.stringify(username));
          expect(service.isLoggedIn()).toBe(true);
        });
      }));
    });
    describe('and when the credentials are invalid', () => {
      it('the request does not return a token, and sends a false in the loginStatusStream', async(() => {
        // Arrange:
        service.removeUser();
        service.removeToken();
        spyOn(httpClient, 'post').and.returnValue(of({}));
        // Act:
        service.login(username, password).subscribe((response) => {
          // Assert:
          expect(httpClient.post).toHaveBeenCalledWith(url, data);
          const retrievedToken = localStorage.getItem('token');
          expect(retrievedToken).toBeFalsy();
          const retrievedUser = localStorage.getItem('user');
          expect(retrievedUser).toBeFalsy();
          expect(service.isLoggedIn()).toBe(false);
        });
      }));
    });
  });
});
