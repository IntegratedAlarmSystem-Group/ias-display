import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * Component that defines the login form
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Message with the current login status, to be displayed in the component
   */
  message: string;

  /**
   * Object used to manage the form and check the validity of the form input fields
   */
  formGroup: FormGroup;

  /**
   * Form control used to retrieve the username from the form
   */
  user: FormControl;

  /**
   * Form control used to retrieve the password from the form
   */
  password: FormControl;

  loggingIn = false;

  /**
   * Builds an instance of the component
   * @param {FormBuilder} formBuilder Angular FormBuilder used to build forms
   * @param {AuthService} authService service used to check and handle authorization
   * @param {Router} router Angular router used to navigate the application
   */
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.setMessage();
  }

  /**
   * Initializes the component and defines its form
   */
  ngOnInit() {
    this.loggingIn = false;
    this.user = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.formGroup = this.formBuilder.group({
      user: this.user,
      password: this.password,
    });
  }

  /**
   * Sets the {@link message} to be displayed
   */
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn() ? 'in' : 'out');
  }

  /**
   * Performs the login, by calling the login() function of {@link AuthService} passing the user and password retrieved from the form
   */
  login() {
    this.message = 'Logging in ...';
    this.loggingIn = true;
    this.authService.login(
      this.formGroup.controls.user.value,
      this.formGroup.controls.password.value,
    ).subscribe(
      () => {
        // this.loggingIn = false;
        this.setMessage();
        if (this.authService.isLoggedIn()) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
          // Redirect the user
          this.router.navigate([redirect]);
        }
      },
      (error) => {
        // this.loggingIn = false;
        this.setMessage();
      }
    );
  }

  /**
   * Performs the logout, by calling the logout() function of {@link AuthService}
   */
  logout() {
    this.authService.logout();
    this.setMessage();
  }

}
