import { Injectable } from '@angular/core';
import { User } from '../model/user.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | undefined
  isLogin: boolean = false
  users: User[] = []
  error: boolean = false

  constructor(
    private http: HttpClient,
    private router: Router
  )
  {}

  // Sign in with email/password
  login(email: string, password: string) {
    this.http.get<User[]>(`http://localhost:3000/users?email=${email}`).subscribe((user: User[]) => {
      const userData = user[0]
      if (userData && userData.password === password ) {
        this.user = userData
        this.isLogin = true
        localStorage.setItem('user', JSON.stringify(userData))
        this.router.navigateByUrl('/folder')
      } else {
        this.error = true
        this.user = undefined
        setTimeout(() => {
          this.error = false
        }, 5000)
      }
    })
  }

  // Sign up with email/password
  register(username: string, email: string, password: string) {
    this.http.post('http://localhost:3000/users', { username, email, password }).subscribe(() => {
      this.login(email, password)
    })
  }

  retrieveUserLocalStorage() {
    const userFromLocalStorage: string | null = localStorage.getItem('user')
    if (userFromLocalStorage) {
      this.user = JSON.parse(userFromLocalStorage);
      this.isLogin = true;
    }
  }

  getAllUsers() {
    return this.http.get<User[]>(`http://localhost:3000/users`).subscribe((users: User[]) => {
      return this.users = users;
    });
  }


  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }


  // Sign out
  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
    this.isLogin = false;
    this.router.navigate(['/login']);
  }
}
