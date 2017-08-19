import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ThemoviedbService } from '../../services/themoviedb.service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-identify',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.css']
})
export class IdentifyComponent implements OnInit {

  request_token;
  authenticateDomain = 'https://www.themoviedb.org/authenticate/';
  redirectTo = '?redirect_to=http://localhost:4200/login';

  messageShow = false;
  messageClass;
  message;
  buttonClass;

  constructor(
    private authenticateService: AuthenticateService
  ) { }


  onClickLogIn() {
    this.authenticateService.getRequestToken()
      .subscribe(data => {
        this.request_token = data.request_token;
        this.authenticateService.storeRequestToken(this.request_token);
      });
    this.messageShow = true;
    this.messageClass = 'alert alert-success';
    this.message = 'Estás siendo redirigido a www.themoviedb.org';
    this.buttonClass = 'disabled';

    setTimeout(() => {
      this.authenticateService.goToLogIn(this.request_token);
    }, 3000);
  }

  ngOnInit() {
    localStorage.clear();
  }

}
