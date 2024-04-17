import { Component } from '@angular/core';
import { callApi } from 'src/services/OMDBService';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.callApiLocal();
  }

  callApiLocal()  {
    callApi();
  }

  
}
