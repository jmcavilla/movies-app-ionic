import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private service: LoginService, private router: Router) {
    this.checkSession();
  }

  checkSession = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const status = await (await this.service.checkSession()).status;
      if (status === 200) {
        this.router.navigate(['/home'], {replaceUrl: true})
      }else{
        this.router.navigate(['/login'], {replaceUrl: true})
      }

    }else{
      this.router.navigate(['/login'], {replaceUrl: true})
    }
  }
  
}
