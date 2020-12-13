import { BasicAuthenticationService } from './../services/basic-auth.service';
import { HardcodedAuthService } from './../services/hardcoded-auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private hardcodedAuthService: HardcodedAuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private basicAuthService: BasicAuthenticationService
  ) {}

  username = 'spring.angular';
  password = '123';
  message = '';

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  onSubmit(f) {
    if (
      f.valid &&
      this.hardcodedAuthService.authenticate(this.username, this.password)
    ) {
      this.message = 'success';
      this.router.navigate(['welcome', this.username]);
      this.openSnackBar('success', '');
    } else {
      this.message = 'invalid credentials';
      this.openSnackBar(this.message, '');
    }
  }

  handleBasicAuthLogin() {
    this.basicAuthService
      .executeJWTAuthService(this.username, this.password)
      .subscribe(
        (data) => {
          console.log(data)
          this.router.navigate(['welcome', this.username]);
          this.openSnackBar('success', '');
        },
        (error) => {
          console.log(error);
          this.openSnackBar('something went wrong!', '');
        }
      );
  }

  ngOnInit(): void {}
}
