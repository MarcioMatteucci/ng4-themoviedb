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

  messageClass;
  message;
  processing = false;
  form: FormGroup;

  constructor(
    private themoviedbService: ThemoviedbService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  disableForm() {
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  onLoginSubmit() {
    return true;
  }

  ngOnInit() {
    this.themoviedbService.getRequestToken()
      .subscribe(data => {
        this.request_token = data.request_token;
        // console.log(this.request_token);
      });
  }

}
