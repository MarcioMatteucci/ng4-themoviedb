import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  request_token = localStorage.getItem('request_token');
  session_id;
  isApproved;

  constructor(
    private authenticateService: AuthenticateService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
  ) { }

  onClickLogIn() {
    this.authenticateService.getSessionId(this.request_token)
      .subscribe(data => {
        this.session_id = data.session_id;
        this.authenticateService.storeSessionId(this.session_id);
      });
    this.flashMessagesService.show('Su sesión se ha iniciado', { cssClass: 'alert alert-info text-center h4 lead' });
  }

  tryAgain() {
    this.router.navigate(['/identify']);
  }

  ngOnInit() {
    this.isApproved = this.route.snapshot.queryParams['approved'];
    // console.log(this.isApproved);
  }

}

