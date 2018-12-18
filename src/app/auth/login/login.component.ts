import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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


  /**
   * Error message to be displayed if the ogin is not successful
   */
  errorMessage = undefined;


  /**
   * Builds an instance of the component
   * @param {FormBuilder} formBuilder Angular FormBuilder used to build forms
   * @param {AuthService} authService service used to check and handle authorization
   * @param {Router} router Angular router used to navigate the application
   * @param {SpinnerService} spinnerService Service to provide the loading spinner functionality
   */
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private spinnerService: NgxSpinnerService
  ) {
  }

  /**
   * Initializes the component and defines its form
   */
  ngOnInit() {
    this.errorMessage = undefined;
    this.user = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.formGroup = this.formBuilder.group({
      user: this.user,
      password: this.password,
    });
  }

  /**
   * Performs the login, by calling the login() function of {@link AuthService} passing the user and password retrieved from the form
   */
  login() {
    this.errorMessage = undefined;
    this.spinnerService.show();
    this.authService.login(
      this.formGroup.controls.user.value,
      this.formGroup.controls.password.value,
    ).subscribe(
      (response) => {
        if (response === true) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
          // Redirect the user
          this.router.navigate([redirect]);
        }
        this.spinnerService.hide();
      },
      (error) => {
        this.spinnerService.hide();
        this.setErrorMessage(error);
      }
    );
  }

  /**
   * Performs the logout, by calling the logout() function of {@link AuthService}
   */
  logout() {
    this.authService.logout();
  }

  /**
   * Sets the {@link errorMessage} to display, based on the status code of the error returned by the request.
   * If the status code is 400, it shows that the credentials are not valid
   * If the status code is not 400, it shows that there was a problem communicating with the server.
   * @param {Error} error the error returned by the request
   */
  setErrorMessage(error) {
    if (error.status === 400) {
      this.errorMessage = 'The credentials provided are not valid';
    } else {
      this.errorMessage = 'There was an error communicating with the Server';
      console.error('Error communicating with Server: ', error);
    }
    this.user.setErrors({'incorrect': true});
    this.password.setErrors({'incorrect': true});
  }

}
