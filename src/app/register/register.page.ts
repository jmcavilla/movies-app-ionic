import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {

  registerForm;
  image: any;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController

  ) {

    this.registerForm = this.formBuilder.group({
      user: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      firstName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), this.matchValidator('confirmPassword', true)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), this.matchValidator('password')])],
    })

  }

  matchValidator(
    matchTo: string,
    reverse?: boolean
  ): ValidatorFn {
    return (control: AbstractControl):
      ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value ===
        (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }

  async register() {
    const loading = await this.loadingController.create()
    loading.present()
    // Asi se deberia llamar al servicio de registro, pero con fines de funcionalidad de la aplicacion, se harcodea los datos a un servicio dummy para recibir un token y utilizarlo
    //this.loginService.register(this.registerForm.value.user,this.registerForm.value.password);
    const resp = await (await this.loginService.register('kminchelle', '0lelplR')).json();
    localStorage.setItem("token", resp.token);
    this.loginService.saveUserData({
      image: this.image,
      firstName: this.firstName.value,
      username: this.user.value
    })
    setTimeout(() => {
      loading.dismiss()
      this.router.navigate(['/home'], {replaceUrl: true});
    }, 3500);
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });

    var imageUrl = image.dataUrl;
    this.image = imageUrl;

  };

  get user() {
    return this.registerForm.get('user'); 
  }

  get password() {
    return this.registerForm.get('password'); 
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword'); 
  }

  get firstName() { 
    return this.registerForm.get("firstName")
  }


}
