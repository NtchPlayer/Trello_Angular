import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public isLogin: boolean = true;

  constructor(public authService: AuthService) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  loginOrRegister () {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      if (this.isLogin) {
        this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      }
      else {
        this.authService.register(this.loginForm.value.username ? this.loginForm.value.username : '', this.loginForm.value.email, this.loginForm.value.password)
      }
    }
  }
}
