import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;

  user: FormControl;

  password: FormControl;

  /**
   * Object used to manage the form and check the validity of the form input fields
   */
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.setMessage();
  }

  ngOnInit() {
    this.user = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.formGroup = this.formBuilder.group({
      user: this.user,
      password: this.password,
    });
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn() ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login(
      this.formGroup.controls.user.value,
      this.formGroup.controls.password.value,
    ).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn()) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

}
