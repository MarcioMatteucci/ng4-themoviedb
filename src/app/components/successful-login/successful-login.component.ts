import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-successful-login',
  templateUrl: './successful-login.component.html',
  styleUrls: ['./successful-login.component.css']
})
export class SuccessfulLoginComponent implements OnInit {

  request_token = localStorage.getItem('request_token');
  session_id;

  constructor(
    private authenticateService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticateService.getSessionId(this.request_token)
      .subscribe(data => {
        this.session_id = data.session_id;
        this.authenticateService.storeSessionId(this.session_id);
      });

    setTimeout(() => {
      this.router.navigate(['/search']);
    }, 3000);
  }
}
