import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    public authenticateService: AuthenticateService,
    private flashMessagesService: FlashMessagesService
  ) { }

  onClickLogOut() {
    this.authenticateService.logOut();
    this.flashMessagesService.show('Su sesión se ha cerrado', { cssClass: 'alert alert-info text-center h4 lead' });
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
