import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { FolderComponent } from './view/folder/folder.component';
import { TaskComponent } from './view/task/task.component';
import { RegisterComponent } from './view/register/register.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},{
  path: 'register',
  component: RegisterComponent
}, {
  path: 'folder',
  component: FolderComponent,
},  {
  path: 'folder/:id',
  component: TaskComponent,
}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
