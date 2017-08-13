import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  request_token;

  constructor(
    private themoviedbService: ThemoviedbService
  ) { }

  ngOnInit() {
    this.themoviedbService.getRequestToken()
      .subscribe(data => {
        this.request_token = data.request_token;
        // console.log(this.request_token);
      });
  }

}
