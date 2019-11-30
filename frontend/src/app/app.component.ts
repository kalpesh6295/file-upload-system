import { Component, OnInit, Inject } from '@angular/core';
import { LoginComponent } from './Auth/login.component';
import { MatDialogConfig, MatDialog, MatDialogRef } from'@angular/material';
import { SignupComponent } from './Auth/signup.component';
import { FileuploadService } from './fileupload.service';
import { FileUploadFormComponent } from './file-upload-form/file-upload-form.component';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  constructor(

    public dialog: MatDialog,
    public LoginDialogRef: MatDialogRef<LoginComponent>,
    public SignupDialogRef:MatDialogRef<SignupComponent>,
    public fileService:FileuploadService,
    @Inject(LOCAL_STORAGE) public storage: WebStorageService
    
    ){

  }

  ngOnInit(){
    if(this.storage.get('token')){
      this.fileService.userLoggedIn=true;
      this.fileService.userName=this.storage.get('userName');
      if(!this.fileService.userName){
        this.fileService.userLoggedIn=false;
      }
    }
  }

  openLoginDialog() {
    // this.SignupDialogRef.close(SignupComponent);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  openSignupDialog(){
    // this.LoginDialogRef.close(LoginComponent);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(SignupComponent, dialogConfig);
  }

  
  fileuploadPopup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(FileUploadFormComponent,dialogConfig);
  }

}
