import { Component } from '@angular/core';
import { MovieData } from 'src/services/movies';
import { MoviesService } from 'src/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public movies: Array<MovieData> = [];
  constructor( private moviesService: MoviesService) {
    this.getMovies()
  }

  async getMovies(){
    const resp = await this.moviesService.getMovies()
    const data = await resp.json();
    this.movies = data.results;

    console.log(this.movies)
  }

}
