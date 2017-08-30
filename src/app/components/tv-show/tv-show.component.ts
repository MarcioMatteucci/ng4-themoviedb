import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ThemoviedbService } from '../../services/themoviedb.service';
import { AuthenticateService } from '../../services/authenticate.service';

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

  id: string;
  tvshow: TvShow;
  genres: Genre[];
  cast: People[];
  hasReviews = false;
  hasCrew = false;
  tvShowId;

  constructor(
    private themoviedbService: ThemoviedbService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.tvShowId = +params['id'];
    });

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
  }

}
