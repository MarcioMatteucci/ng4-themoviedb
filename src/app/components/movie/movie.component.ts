import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CastComponent } from '../cast/cast.component';

import { ThemoviedbService } from '../../services/themoviedb.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';

import { Movie } from '../../models/Movie';
import { Genre } from '../../models/Genre';
import { Review } from '../../models/Review';
import { People } from '../../models/People';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  sendingUserWatchlist: boolean;

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
  userWatchlist;
  volverPuntuar = false;
  isLoading = true;
  currentValue = 5;
  btnMinusClass;
  btnPlusClass;
  maxLimit;
  minLimit;
  colorWatch;
  textWatchlist;
  sendingUserRating = false;
  btnWatchlist;
  iconWatchlist;

  constructor(
    private themoviedbService: ThemoviedbService,
    public authService: AuthenticateService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  onClickVolverPuntuar() {
    this.volverPuntuar = true;
    this.currentValue = this.userRating;
  }

  onClickRate() {
    // console.log(this.currentValue);
    this.sendingUserRating = true;

    this.userService.setMovieRating(this.movieId, this.currentValue)
      .subscribe(data => {
        // console.log(data);
        if (data.status_code === 12 || data.status_code === 1) {
          setTimeout(() => {
            this.toastr.success('Valoraste la película con un ' + this.currentValue, 'Exito!');
            this.userRating = this.currentValue;
            this.userHasVoted = true;
            this.volverPuntuar = false;
            this.sendingUserRating = false;
          }, 1000);
        } else {
          this.toastr.error('Algo salió mal, vuelve a intentar', 'Error!');
        }
      });
  }

  onClickPlus() {
    this.currentValue = this.currentValue + 0.5;
    this.btnMinusClass = '';
    this.minLimit = false;
    if (this.currentValue === 10) {
      this.btnPlusClass = 'disabled';
      this.maxLimit = true;
    }
  }

  onClickMinus() {
    this.currentValue = this.currentValue - 0.5;
    this.btnPlusClass = '';
    this.maxLimit = false;
    if (this.currentValue === 0) {
      this.btnMinusClass = 'disabled';
      this.minLimit = true;
    }
  }

  onClickWatchlist() {
    // console.log(this.currentValue);
    this.sendingUserWatchlist = true;

    this.userService.setMovieWatchlist(this.movieId, this.userWatchlist)
      .subscribe(data => {
        // console.log(data);
        if (data.status_code === 12 || data.status_code === 1) {
          setTimeout(() => {
            this.toastr.success('Agregaste la Película a tu Watchlist', 'Exito!');
            this.sendingUserWatchlist = false;
            this.textWatchlist = 'Quitar de Watchlist';
            this.iconWatchlist = 'fa fa-eye-slash';
            this.btnWatchlist = 'btn btn-danger';
            this.userWatchlist = true;
          }, 1000);
        } else if (data.status_code === 13) {
          setTimeout(() => {
            this.toastr.success('Quitaste la Película a tu Watchlist', 'Exito!');
            this.userWatchlist = false;
            this.textWatchlist = 'Agregar a Watchlist';
            this.iconWatchlist = 'fa fa-eye';
            this.btnWatchlist = 'btn btn-success';
            this.sendingUserWatchlist = false;
          }, 1000);
        } else {
          this.toastr.error('Algo salió mal, vuelve a intentar', 'Error!');
        }
      });
  }

  ngOnInit() {

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

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

      this.userService.getUserWatchlistMovies()
        .subscribe(data => {
          // console.log(data.results);
          if (data.results.find(movie => movie.id === this.movieId)) {
            this.userWatchlist = true;
            this.btnWatchlist = 'btn btn-danger';
            this.textWatchlist = 'Quitar de Watchlist';
            this.iconWatchlist = 'fa fa-eye-slash';
            // console.log(this.userWatchlist);
          } else {
            this.userWatchlist = false;
            // console.log(this.userWatchlist);
            this.btnWatchlist = 'btn btn-success';
            this.textWatchlist = 'Agregar a Watchlist';
            this.iconWatchlist = 'fa fa-eye';
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
          }, (err: any) => {
            if (err.status === 404) {
              this.toastr.error('No existe Película con ese ID', 'Error!');
              this.router.navigate(['/search']);
            }
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
