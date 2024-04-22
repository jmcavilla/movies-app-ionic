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
    this.checkSession();
  }


  login = async () => {
    const loading = await this.loadingController.create()
    loading.present()
    console.log(this.loginForm.value)
    //this.service.login(this.loginForm.value.user,this.loginForm.value.password);
    const resp = await this.service.login('kminchelle', '0lelplR');
    const { token } = await resp.json();

    console.log(token);
    setTimeout(() => {

      if (token) {
        loading.dismiss()
        localStorage.setItem('token', token);
        this.router.navigate(['/home'])
      }
    }, 2500);
  }

  checkSession = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const data = await (await this.service.checkSession()).json();
      console.log(data)
      if (data) {
        this.router.navigate(['/home'])
      }

    }
  }

}
