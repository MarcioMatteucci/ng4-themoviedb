import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Movie } from '../models/Movie';

@Injectable()
export class UserService {

  domain = 'https://api.themoviedb.org/3';
  typeAccount = '/account?';
  typeVotedMovies = '/account/{account_id}/rated/movies?';
  apiKey = 'api_key=a1f9c26ac26edcec7f8c8237a061f2d7';
  sessionId = '&session_id=' + localStorage.getItem('session_id');

  private userProfileUrl;
  private userVotedMovies;

  constructor(
    private http: Http
  ) { }


  // https://api.themoviedb.org/3/account?api_key=a1f9c26ac26edcec7f8c8237a061f2d7&session_id=236e2638014121426070b1e304ab4b25c4a6a793
  getUserProfile() {
    this.userProfileUrl = this.domain + this.typeAccount + this.apiKey + this.sessionId;
    return this.http.get(this.userProfileUrl)
      .map(res => res.json());
  }

  // tslint:disable-next-line:max-line-length
  // https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=<<>>&language=es-ES&session_id=<<>>&sort_by=created_at.asc&page=1
  getUserVotedMovies() {
    // tslint:disable-next-line:max-line-length
    this.userVotedMovies = this.domain + this.typeVotedMovies + this.apiKey + '&language=es-ES' + this.sessionId + '&sort_by=created_at.asc&page=1';
    return this.http.get(this.userVotedMovies)
      .map(res => res.json());
  }

}
