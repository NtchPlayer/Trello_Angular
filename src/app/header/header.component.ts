import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  public isLogin: boolean = false;

  constructor(private service: AuthService) {
  }

  ngOnInit(): void {
    this.service.getUserData()
  }

  logout() {
    this.service.logout();
  }
}
