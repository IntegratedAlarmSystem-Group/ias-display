import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { DataModule } from '../../data/data.module';
import { LoginComponent } from './login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IasMaterialModule } from '../../ias-material/ias-material.module';
import { AuthService } from '../auth.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const username = 'myUsername';
  const password = 'myPassword';
  const redirectUrl = 'urlToGoAfterLogin';
  let authService: AuthService;
  let router: Router;
  const spyRoutingTable = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        NgxSpinnerModule,
        IasMaterialModule,
        ReactiveFormsModule,
        DataModule
      ],
      providers: [
        { provide: Router, useValue: spyRoutingTable },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should have a login method that reads the username and a password from the form,', () => {

    describe('such that when successful', () => {
      it('the application navigates to the redirectUrl,', async(() => {
        // Arrange:
        component.user.setValue(username);
        component.password.setValue(password);
        authService.redirectUrl = redirectUrl;
        spyOn(authService, 'login').and.returnValue(of(true));
        spyOn(authService, 'hasValidToken').and.returnValue(of(true));
        spyRoutingTable.navigate.calls.reset();
        // Act:
        component.login();
        // Assert:
        expect(authService.login).toHaveBeenCalledWith(username, password);
        expect(router.navigate).toHaveBeenCalledWith([redirectUrl]);
      }));
    });

    describe('such that when failed', () => {
      it('the application does not navigate to the redirectUrl,', async(() => {
        // Arrange:
        component.user.setValue(username);
        component.password.setValue(password);
        authService.redirectUrl = redirectUrl;
        spyOn(authService, 'login').and.returnValue(of(false));
        spyOn(authService, 'hasValidToken').and.returnValue(of(false));
        spyRoutingTable.navigate.calls.reset();
        // Act:
        component.login();
        // Assert:
        expect(authService.login).toHaveBeenCalledWith(username, password);
        expect(router.navigate).not.toHaveBeenCalledWith([redirectUrl]);
      }));
    });
  });
});
