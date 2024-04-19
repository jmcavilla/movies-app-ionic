import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor( 
    private actionSheetCtrl: ActionSheetController,
    private loginService: LoginService,
    private router: Router,
    private loadingCtrl: LoadingController
   ) { }


  presentActionSheet = async () =>  {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Configuracion',
      mode: 'ios',
      buttons: [
        {
          text: 'Cerrar sesion',
          role: 'destructive',
          handler: this.logout
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  logout = async () => {
    const loading = await this.loadingCtrl.create();

    loading.present();
    console.log("entro")
    this.loginService.logout();
    setTimeout(() => {
      this.router.navigate(['login'])
      loading.dismiss();
    }, 2000);
  }
}
