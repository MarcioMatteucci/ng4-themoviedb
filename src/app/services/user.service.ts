import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  domain = 'https://api.themoviedb.org/3';
  typeAccount = '/account?';
  apiKey = 'api_key=a1f9c26ac26edcec7f8c8237a061f2d7';
  sessionId = '&session_id=' + localStorage.getItem('session_id');

  private userProfileUrl;

  constructor(
    private http: Http
  ) { }


  // https://api.themoviedb.org/3/account?api_key=a1f9c26ac26edcec7f8c8237a061f2d7&session_id=236e2638014121426070b1e304ab4b25c4a6a793
  getUserProfile() {
    this.userProfileUrl = this.domain + this.typeAccount + this.apiKey + this.sessionId;
    return this.http.get(this.userProfileUrl)
      .map(res => res.json());
  }

}
