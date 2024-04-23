import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public isModalOpen: boolean = false;
  public userData: any;
  themeToggle = false;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private loginService: LoginService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit(): void {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkTheme(mediaQuery.matches));
    this.userData = this.loginService.getUserData();
  }

  presentActionSheet = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Configuracion',
      mode: 'ios',
      buttons: [
        {
          text: 'Ver perfil',
          handler: this.openModal
        },
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
    this.loginService.logout();
    setTimeout(() => {
      this.router.navigate(['login'])
      loading.dismiss();
    }, 2000);
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });

    var imageUrl = image.dataUrl;
    this.userData.image = imageUrl;
    this.loginService.saveUserData({ ...this.userData, image: imageUrl })
  };

  cancel = () => {
    this.isModalOpen = false;
  }

  openModal = () => {
    this.isModalOpen = true;
  }

  // Check/uncheck the toggle and update the theme based on isDark
  initializeDarkTheme(isDark) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark theme
  toggleChange(ev) {
    this.toggleDarkTheme(ev.detail.checked);
  }

  // Add or remove the "dark" class on the document body
  toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}
