import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successful-login',
  templateUrl: './successful-login.component.html',
  styleUrls: ['./successful-login.component.css']
})
export class SuccessfulLoginComponent implements OnInit {

  request_token = localStorage.getItem('request_token');
  session_id;

  constructor(
    private themoviedbservice: ThemoviedbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.themoviedbservice.getSessionId(this.request_token)
      .subscribe(data => {
        this.session_id = data.session_id;
        this.themoviedbservice.storeSessionId(this.session_id);
      });

    setTimeout(() => {
      this.router.navigate(['/search']);
    }, 2000);
  }
}
