import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ThemoviedbService {

  domain = 'https://api.themoviedb.org/3';
  typeSearchMovie = '/search/movie?';
  typeMovieById = '/movie/';
  typeSearchTv = '/search/tv?';
  typeTvById = '/tv/';
  apiKey = 'api_key=a1f9c26ac26edcec7f8c8237a061f2d7';
  languageEs = '&language=es-ES';
  languageUs = '&language=en-US';
  query = '&query=';
  page1 = '&page=1';
  include_adult = '&include_adult=false';

  private searchUrl: string;
  private movieUrl: string;
  private reviewsUrl: string;
  private castUrl: string;

  constructor(
    private http: Http
  ) { }

  // Movies

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

  // TV Shows

  // https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&page=1
  searchTvShow(str: string) {
    // tslint:disable-next-line:max-line-length
    this.searchUrl = this.domain + this.typeSearchTv + this.apiKey + this.languageEs + this.query + str + this.page1;
    return this.http.get(this.searchUrl)
      .map(res => res.json());
  }

  // https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
  getTvShowById(tvShowId: string) {
    this.searchUrl = this. domain + this.typeTvById + this.apiKey + tvShowId + '?' + this.apiKey + this.languageEs;
  }
}
