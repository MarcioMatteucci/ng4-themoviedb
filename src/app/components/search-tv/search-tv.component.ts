import { Component, OnInit } from '@angular/core';
import { ThemoviedbService } from '../../services/themoviedb.service';
import { TvShow } from '../../models/TvShow';

@Component({
  selector: 'app-search-tv',
  templateUrl: './search-tv.component.html',
  styleUrls: ['./search-tv.component.css']
})
export class SearchTvComponent implements OnInit {

  searchStr = '';
  tvshows: TvShow[];
  findSomething = false;

  constructor(
    private themoviedbService: ThemoviedbService
  ) { }

  searchTvShow() {
    console.log(this.searchStr);
    if (this.searchStr !== '') {
      this.themoviedbService.searchTvShow(this.searchStr)
        .subscribe(data => {
          if (data.total_results > 0) {
            this.findSomething = true;
            console.log(data.results);
            this.tvshows = data.results;
          } else {
            this.findSomething = false;
          }
        });
      }
    }

  ngOnInit() {
  }

}
