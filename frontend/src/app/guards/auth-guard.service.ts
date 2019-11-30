import { Injectable , Inject} from '@angular/core';
import { FileuploadService } from '../fileupload.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( @Inject(LOCAL_STORAGE) public storage: WebStorageService, private fileService: FileuploadService , private _router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.storage.get('token')) {
        return true;
    }
    this._router.navigate(['']);
    return false;
  }


}
