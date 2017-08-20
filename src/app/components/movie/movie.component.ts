import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ThemoviedbService } from '../../services/themoviedb.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';

import { Movie } from '../../models/Movie';
import { Genre } from '../../models/Genre';
import { Review } from '../../models/Review';
import { People } from '../../models/People';




@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  id: string;
  movie: Movie;
  genres: Genre[];
  reviews: Review[];
  cast: People[];
  hasReviews = false;
  hasCrew = false;
  director: string;
  movieId;
  userRating;
  userHasVoted;
  volverPuntuar = false;

  constructor(
    private themoviedbService: ThemoviedbService,
    public authService: AuthenticateService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  onClickVolverPuntuar () {
    this.volverPuntuar = true;
  }

  getUserVotedMovies() {
    this.userService.getUserVotedMovies()
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
    });

    if (this.authService.isLoggedIn()) {
      this.userService.getUserVotedMovies()
        .subscribe(data => {
          if (data.results.find(movie => movie.id === this.movieId)) {
            this.userRating = data.results.find(movie => movie.id === this.movieId).rating;
            this.userHasVoted = true;
            // console.log(this.userRating);
          } else {
            this.userHasVoted = false;
          }
        });
    }

    this.route.params.map(params => params['id'])
      .subscribe((id) => {
        this.themoviedbService.getMovieById(id)
          .subscribe(data => {
            this.movie = data;
            this.genres = this.movie.genres;
            // console.log(this.movie);
          });

        this.themoviedbService.getReviewsByMovieId(id)
          .subscribe(data => {
            if (data.total_results > 0) {
              this.hasReviews = true;
              this.reviews = data.results;
              // console.log(this.reviews);
            }
          });

        this.themoviedbService.getCastByMovieId(id)
          .subscribe(data => {
            if (data) {
              this.hasCrew = true;
              // console.log(data);
              this.director = data.crew.find(p => p.job === 'Director').name;
              this.cast = data.cast;
              // console.log(this.cast);
              // console.log(this.cast[0].character);
            }
          });
      });
  }

}
