import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './shared/UI/button/button.component';
import { LinkComponent } from './shared/UI/link/link.component';
import { IconButtonComponent } from './shared/UI/icon-button/icon-button.component';
import { SvgUseComponent } from './shared/UI/svg-use/svg-use.component';
import { SvgIconsComponent } from './shared/UI/svg-icons/svg-icons.component';
import { InputFieldComponent } from './shared/UI/input-field/input-field.component';

import { InlineSVGModule } from 'ng-inline-svg-2';
import { LoginComponent } from './view/login/login.component';
import { FolderComponent } from './view/folder/folder.component';
import { TaskComponent } from './view/task/task.component';
import { CommonModule } from "@angular/common";
import { ModalComponent } from './shared/modal/modal.component';
import { ModalFolderComponent } from './shared/modal-folder/modal-folder.component';
import { ModalTaskComponent } from './shared/modal-task/modal-task.component';
import { CheckboxComponent } from './shared/checkbox/checkbox.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    LinkComponent,
    IconButtonComponent,
    SvgUseComponent,
    SvgIconsComponent,
    InputFieldComponent,
    LoginComponent,
    FolderComponent,
    TaskComponent,
    FolderComponent,
    ModalComponent,
    ModalFolderComponent,
    ModalTaskComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InlineSVGModule.forRoot({
      baseUrl: 'http://localhost:4200'
    }),
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
