import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
    public toastr: ToastsManager
  ) { }

  onClickLogOut() {
    this.authenticateService.logOut();
    this.toastr.success('Tu sesión se ha cerrado', 'Exito!');
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
