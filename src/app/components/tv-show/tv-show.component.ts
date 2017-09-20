import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ThemoviedbService } from '../../services/themoviedb.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';

import { TvShow } from '../../models/TvShow';
import { Genre } from '../../models/Genre';
import { Review } from '../../models/Review';
import { People } from '../../models/People';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit {
  sendingUserWatchlist: boolean;

  id: string;
  tvshow: TvShow;
  genres: Genre[];
  cast: People[];
  hasCrew = false;
  tvShowId;
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

  logInFromTv() {
    // console.log(window.location.pathname);
    localStorage.setItem('redirectToTv', window.location.pathname);
    this.router.navigate(['/identify']);
  }

  onClickVolverPuntuar() {
    this.volverPuntuar = true;
    this.currentValue = this.userRating;
  }

  onClickRate() {
    // console.log(this.currentValue);
    this.sendingUserRating = true;

    this.userService.setTvShowRating(this.tvShowId, this.currentValue)
      .subscribe(data => {
        // console.log(data);
        if (data.status_code === 12 || data.status_code === 1) {
          setTimeout(() => {
            this.toastr.success('Valoraste la serie con un ' + this.currentValue, 'Exito!');
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

    this.userService.setTvShowWatchlist(this.tvShowId, this.userWatchlist)
      .subscribe(data => {
        // console.log(data);
        if (data.status_code === 12 || data.status_code === 1) {
          setTimeout(() => {
            this.toastr.success('Agregaste la Serie a tu Watchlist', 'Exito!');
            this.sendingUserWatchlist = false;
            this.textWatchlist = 'Quitar de Watchlist';
            this.iconWatchlist = 'fa fa-eye-slash';
            this.btnWatchlist = 'btn btn-danger';
            this.userWatchlist = true;
          }, 1000);
        } else if (data.status_code === 13) {
          setTimeout(() => {
            this.toastr.success('Quitaste la Serie de tu Watchlist', 'Exito!');
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
      this.tvShowId = +params['id'];
    });

    if (this.authService.isLoggedIn()) {
      this.userService.getUserVotedTvShows()
        .subscribe(data => {
          if (data.results.find(tvshow => tvshow.id === this.tvShowId)) {
            this.userRating = data.results.find(tvshow => tvshow.id === this.tvShowId).rating;
            this.userHasVoted = true;
            // console.log(this.userRating);
          } else {
            this.userHasVoted = false;
          }
        });

      this.userService.getUserWatchlistTvShows()
        .subscribe(data => {
          // console.log(data.results);
          if (data.results.find(tvshow => tvshow.id === this.tvShowId)) {
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
      this.themoviedbService.getTvShowById(id)
        .subscribe(data => {
          this.tvshow = data;
          this.genres = this.tvshow.genres;
          console.log(this.tvshow);
        }, (err: any) => {
          if (err.status === 404) {
            this.toastr.error('No existe Serie con ese ID', 'Error!');
            this.router.navigate(['/search-tv']);
          }
        });

      this.themoviedbService.getCastByTvShowId(id)
        .subscribe(data => {
          if (data) {
            this.hasCrew = true;
            console.log(data);
            this.cast = data.cast;
            // console.log(this.cast);
            // console.log(this.cast[0].character);
          }
        });
      });

      localStorage.removeItem('redirectToTv');
  }

}
