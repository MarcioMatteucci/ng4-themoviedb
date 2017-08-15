import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  request_token = localStorage.getItem('request_token');
  session_id;

  constructor(
    private authenticateService: AuthenticateService,
    private router: Router
  ) { }

  onClickLogIn() {
    this.authenticateService.getSessionId(this.request_token)
      .subscribe(data => {
        this.session_id = data.session_id;
        this.authenticateService.storeSessionId(this.session_id);
      });
  }

  ngOnInit() {
  }
}
