import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ThemoviedbService {

  domain = 'https://api.themoviedb.org/3';
  authenticateDomain = 'https://www.themoviedb.org/authenticate/';
  redirectTo = '?redirect_to=http://localhost:4200/search';
  typeSessionId = '/authentication/session/new?';
  typeSearchMovie = '/search/movie?';
  typeMovieById = '/movie/';
  apiKey = 'api_key=a1f9c26ac26edcec7f8c8237a061f2d7';
  languageEs = '&language=es-ES';
  languageUs = '&language=en-US';
  query = '&query=';
  page1 = '&page=1';
  include_adult = '&include_adult=false';
  typeToken = '/authentication/token/new?';

  private searchUrl: string;
  private movieUrl: string;
  private reviewsUrl: string;
  private castUrl: string;
  private tokenUrl: string;
  private loginUrl: string;
  private sessionUrl: string;

  constructor(
    private http: Http
  ) { }

  // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=es-ES&query=inter&page=1&include_adult=false
  searchMovie(str: string) {
    // tslint:disable-next-line:max-line-length
    this.searchUrl = this.domain + this.typeSearchMovie + this.apiKey + this.languageEs + this.query + str + this.page1 + this.include_adult;
    return this.http.get(this.searchUrl)
      .map(res => res.json());
  }

  // https://api.themoviedb.org/3/movie/157336?api_key=a1f9c26ac26edcec7f8c8237a061f2d7&language=en-ES
  getMovieById(movieId: string) {
    this.movieUrl = this.domain + this.typeMovieById + movieId + '?' + this.apiKey + this.languageEs;
    return this.http.get(this.movieUrl)
      .map(res => res.json());
  }

  // https://api.themoviedb.org/3/movie/105/reviews?api_key=a1f9c26ac26edcec7f8c8237a061f2d7&language=es-Es&page=1
  getReviewsByMovieId(movieId: string) {
    this.reviewsUrl = this.domain + this.typeMovieById + movieId + '/reviews?' + this.apiKey + this.languageUs + this.page1;
    return this.http.get(this.reviewsUrl)
      .map(res => res.json());
  }

  // https://api.themoviedb.org/3/movie/105/credits?api_key=a1f9c26ac26edcec7f8c8237a061f2d7
  getCastByMovieId(movieId: string) {
    this.castUrl = this.domain + this.typeMovieById + movieId + '/credits?' + this.apiKey;
    return this.http.get(this.castUrl)
      .map(res => res.json());
  }

  // https://api.themoviedb.org/3/authentication/token/new?api_key=<<api_key>>
  getRequestToken() {
    this.tokenUrl = this.domain + this.typeToken + this.apiKey;
    return this.http.get(this.tokenUrl)
      .map(res => res.json());
  }

  // // https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=http://www.yourapp.com/approved
  // goToLogIn(requestToken: string) {
  //   this.loginUrl = this.authenticateDomain + requestToken + this.redirectTo;
  // }

  // tslint:disable-next-line:max-line-length
  // https://api.themoviedb.org/3/authentication/session/new?api_key=a1f9c26ac26edcec7f8c8237a061f2d7&request_token=837ce5249f1e1c5986359dfd74dae2bf3d26b8c9
  getSessionId(request_token: string) {
    this.sessionUrl = this.domain + this.typeSessionId + this.apiKey + '&request_token=' + request_token;
    return this.http.get(this.sessionUrl)
      .map(res => res.json());
  }

  storeRequestToken(request_token: string) {
    localStorage.setItem('request_token', request_token);
  }

  storeSessionId(session_id: string) {
    localStorage.setItem('session_id', session_id);
  }
}
