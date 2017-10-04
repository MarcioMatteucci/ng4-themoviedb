import { Component, OnInit } from '@angular/core';

import { User } from '../../models/User';
import { Movie } from '../../models/Movie';
import { TvShow } from '../../models/TvShow';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  avatar: string;

  hasVotedMovies = false;
  hasWatchlistMovies = false;
  hasVotedTvShows = false;
  hasWatchlistTvShows = false;
  isLoading = true;

  userVotedMovies: Movie[];
  userWatchlistMovies: Movie[];
  userVotedTvShows: TvShow[];
  userWatchlistTvShows: TvShow[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    this.userService.getUserProfile()
      .subscribe(data => {
        this.user = data;
        this.avatar = data.avatar.gravatar.hash;
        // console.log(this.user);
        // console.log(this.avatar);
      });

    this.userService.getUserVotedMovies()
      .subscribe(data => {
        if (data.total_results !== 0) {
          this.hasVotedMovies = true;
          // console.log('tiene pelis puntuadas');
          this.userVotedMovies = data.results;
          // console.log(this.userVotedMovies);
        }
      });

    this.userService.getUserWatchlistMovies()
      .subscribe(data => {
        if (data.total_results !== 0) {
          this.hasWatchlistMovies = true;
          // console.log('tiene pelis en watchlist');
          this.userWatchlistMovies = data.results;
          // console.log(this.userWatchlistMovies);
        }
      });

      this.userService.getUserVotedTvShows()
      .subscribe(data => {
        if (data.total_results !== 0) {
          this.hasVotedTvShows = true;
          // console.log('tiene series puntuadas');
          this.userVotedTvShows = data.results;
          // console.log(this.userVotedTvShows);
        }
      });

      this.userService.getUserWatchlistTvShows()
      .subscribe(data => {
        if (data.total_results !== 0) {
          this.hasWatchlistTvShows = true;
          // console.log('tiene series en whatchlist');
          this.userWatchlistTvShows = data.results;
          // console.log(this.userWatchlistTvShows);
        }
      });
  }
}
