import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule,MatToolbarModule} from  '@angular/material';
import{MatDialogModule, MatDialogRef} from '@angular/material/dialog'
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignupComponent } from './Auth/signup.component';
import { LoginComponent } from './Auth/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { StorageServiceModule } from 'angular-webstorage-service';
import { FileUploadFormComponent } from './file-upload-form/file-upload-form.component';
import { UserFileComponent } from './user-file/user-file.component';
import { PublicFileComponent } from './public-file/public-file.component';
import { AuthGuardService } from './guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    
    SignupComponent,
    
    LoginComponent,
    
    FileUploadFormComponent,
    
    UserFileComponent,
    
    PublicFileComponent
  ],
  entryComponents: [
    SignupComponent,
    LoginComponent,
    FileUploadFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    StorageServiceModule
  ],
  providers: [{ provide: MatDialogRef, useValue: {} } , AuthGuardService] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
