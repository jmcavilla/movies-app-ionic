import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm;

  constructor(
    private service: LoginService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })

  }

  ngOnInit = (): void => {
    
  }


  login = async () => {
    const loading = await this.loadingController.create()
    loading.present()
    console.log(this.loginForm.value)
    //this.service.login(this.loginForm.value.user,this.loginForm.value.password);
    const resp = await this.service.login('kminchelle', '0lelplR');
    const { token, firstName, image } = await resp.json();

    setTimeout(() => {

      if (token) {
        loading.dismiss()
        localStorage.setItem('token', token);
        this.service.saveUserData({
          image,
          firstName,
          username: this.loginForm.value.user
        })
        this.router.navigate(['/home'])
      }
    }, 2500);
  }

}
