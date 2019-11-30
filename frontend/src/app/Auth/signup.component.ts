import { Component, OnInit, Inject } from '@angular/core';
import { LoginComponent } from './login.component';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { FileuploadService } from '../fileupload.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', [Validators.required]),
  
  });

  constructor(public dialog: MatDialog,
    public SignupDialogRef:MatDialogRef<SignupComponent>,
    public authServices: AuthService,
    @Inject(LOCAL_STORAGE) public storage: WebStorageService,
    public fileService:FileuploadService
    ){
      
  }

  ngOnInit() {
  }

  openLogin(){
    this.SignupDialogRef.close(SignupComponent);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(LoginComponent, dialogConfig);
  }
  closeSignup(){
    this.SignupDialogRef.close();
  }


  onSubmit() {
  
    const SignupForm = this.signupForm.value;
    this.authServices.signup(SignupForm).subscribe( res => {
      this.fileService.userLoggedIn=true;
      this.storage.set('token', res.headers.get('x-auth'));
      this.fileService.userName=res['body']['userName'];
      this.storage.set('userName',this.fileService.userName);
      this.closeSignup()
   }, error =>{
   
   });

  }

}
