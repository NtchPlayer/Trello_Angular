import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { FolderComponent } from './view/folder/folder.component';
import { TaskComponent } from './view/task/task.component';
import { RegisterComponent } from './view/register/register.component';
import { HomeComponent } from './view/home/home.component';

const AuthAccess = () => {
  return Boolean(JSON.parse(localStorage.getItem('user')!))
};

const guestAccess = () => {
  return !Boolean(JSON.parse(localStorage.getItem('user')!))
};

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  title: 'Home - EzTask',
}, {
  path: 'login',
  component: LoginComponent,
  title: 'Login - EzTask',
  canActivate: [guestAccess],
},{
  path: 'register',
  component: RegisterComponent,
  title: 'Register - EzTask',
  canActivate: [guestAccess],
}, {
  path: 'folder',
  component: FolderComponent,
  title: 'Folder - EzTask',
  canActivate: [AuthAccess],
},  {
  path: 'folder/:id',
  component: TaskComponent,
  title: 'Tasks - EzTask',
  canActivate: [AuthAccess],
}, {
  path: '**',
  redirectTo: '',
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
