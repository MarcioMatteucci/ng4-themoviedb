import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
    public toastr: ToastsManager
  ) { }

  onClickLogIn() {
    this.authenticateService.getSessionId(this.request_token)
      .subscribe(data => {
        this.session_id = data.session_id;
        this.authenticateService.storeSessionId(this.session_id);
        this.toastr.success('Tu sesión se ha iniciado', 'Exito!');
        if (localStorage.getItem('redirectToMovie')) {
          this.router.navigate([localStorage.getItem('redirectToMovie')]);
        } else {
          this.router.navigate(['/search']);
        }
      });
  }

  tryAgain() {
    this.router.navigate(['/identify']);
  }

  ngOnInit() {
    this.isApproved = this.route.snapshot.queryParams['approved'];
    // console.log(this.isApproved);
  }

}

