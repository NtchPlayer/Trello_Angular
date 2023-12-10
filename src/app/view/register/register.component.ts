import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(public authService: AuthService) {}

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  register () {
    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.value.username!,
        this.registerForm.value.email!,
        this.registerForm.value.password!
      )
    }
  }
}
