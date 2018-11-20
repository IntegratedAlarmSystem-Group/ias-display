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
    this.spinnerService.show();
    this.authService.login(
      this.formGroup.controls.user.value,
      this.formGroup.controls.password.value,
    ).subscribe(
      () => {
        if (this.authService.isLoggedIn()) {
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
      }
    );
  }

  /**
   * Performs the logout, by calling the logout() function of {@link AuthService}
   */
  logout() {
    this.authService.logout();
  }

}
