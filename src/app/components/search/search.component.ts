import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  option = 1;

  constructor() { }

  ngOnInit() {
  }

  setOption(opt: number) {
    this.option = opt;
  }

}
