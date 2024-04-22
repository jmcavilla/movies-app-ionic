import { Component, OnInit, Input } from '@angular/core';
import { MovieData } from 'src/services/movies';

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.scss'],
})
export class MoviedetailComponent  implements OnInit {

  selMovie: MovieData;
  @Input() movie: MovieData;
  @Input() dismiss: Function;

  constructor() { }

  ngOnInit() {
    console.log("first")
    this.selMovie = this.movie;
  }

}
