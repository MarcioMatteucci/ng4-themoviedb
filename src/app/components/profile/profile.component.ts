import { Component, OnInit } from '@angular/core';

import { User } from '../../models/User';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  avatar: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserProfile()
      .subscribe(data => {
        this.user = data;
        this.avatar = data.avatar.gravatar.hash;
        // console.log(this.user);
        // console.log(this.avatar);
      });

  }
}
