import { Component, Input, OnInit } from '@angular/core';
import { MovieData } from 'src/services/movies';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styleUrls: ['./moviecard.component.scss'],
})
export class MoviecardComponent  implements OnInit {

  @Input() movie: MovieData;

  constructor() { }

  ngOnInit() {
    console.log('creo')
  }
  get movieRate() {
    return parseInt(this.movie.vote_average)/2
  }
}
