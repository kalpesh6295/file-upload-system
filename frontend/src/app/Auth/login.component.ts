import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { SignupComponent } from './signup.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { FileuploadService } from '../fileupload.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    public dialog: MatDialog,
    public authServices: AuthService,
    public LoginDialogRef: MatDialogRef<LoginComponent>,
    @Inject(LOCAL_STORAGE) public storage: WebStorageService,
    public fileService:FileuploadService
    ){

  }

  ngOnInit() {
  }

  openSignup(){
    this.LoginDialogRef.close(LoginComponent);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(SignupComponent, dialogConfig);
  }
  closeLogin(){
    this.LoginDialogRef.close();
  }

  onSubmit() {  
    if (this.login.valid) {
      this.LoginDialogRef.close(LoginComponent);
      const loginValues = this.login.value;
      this.authServices.login(loginValues).subscribe(  res => {
        console.log(res);
        
         this.fileService.userLoggedIn=true;
         this.fileService.userName=res['body']['userName'];
         this.storage.set('token', res.headers.get('x-auth'));
         this.storage.set('userName',this.fileService.userName);

         
         this.closeLogin();
      });
    }

}

}
