import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { FolderComponent } from './view/folder/folder.component';
import { TaskComponent } from './view/task/task.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
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
