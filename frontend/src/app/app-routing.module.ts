import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './Auth/signup.component';
import { LoginComponent } from './Auth/login.component';
import { UserFileComponent } from './user-file/user-file.component';
import { AppComponent } from './app.component';
import { PublicFileComponent } from './public-file/public-file.component';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  {path:'',component:PublicFileComponent},
  {path:'dashboard',component:UserFileComponent ,canActivate: [AuthGuardService]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
