import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private moviesService: MoviesService) {
    this.callApiLocal();
  }

  callApiLocal()  {
    this.moviesService.getMovies();
  }

  
}
