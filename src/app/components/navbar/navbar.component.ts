import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    public authenticateService: AuthenticateService
  ) { }

  onClickLogOut() {
    this.authenticateService.logOut();
  }

  ngOnInit() {
  }

}
