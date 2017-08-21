import { Component, OnInit } from '@angular/core';

import { User } from '../../models/User';
import { Movie } from '../../models/Movie';

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
  isLoading = true;

  userVotedMovies: Movie[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

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
  }
}
