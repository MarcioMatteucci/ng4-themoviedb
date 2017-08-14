import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ThemoviedbService } from '../../services/themoviedb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  request_token;
  authenticateDomain = 'https://www.themoviedb.org/authenticate/';
  redirectTo = '?redirect_to=http://localhost:4200/successfullogin';

  // messageClass;
  // message;
  // processing = false;
  // form: FormGroup;

  constructor(
    private themoviedbService: ThemoviedbService,
    // private formBuilder: FormBuilder
  ) {
    // this.createForm();
  }

  // createForm() {
  //   this.form = this.formBuilder.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  // disableForm() {
  //   this.form.controls['username'].disable();
  //   this.form.controls['password'].disable();
  // }

  // enableForm() {
  //   this.form.controls['username'].enable();
  //   this.form.controls['password'].enable();
  // }

  // onLoginSubmit() {
  //   return true;
  // }

  // https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=http://www.yourapp.com/approved
  goToLogIn() {
    window.location.href = this.authenticateDomain + this.request_token + this.redirectTo;
  }

  ngOnInit() {
    localStorage.clear();
    this.themoviedbService.getRequestToken()
      .subscribe(data => {
        this.request_token = data.request_token;
        console.log(this.request_token);
        this.themoviedbService.storeRequestToken(data.request_token);
      });
  }

}
