import { Injectable, Inject } from '@angular/core';

import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
userLoggedIn = false;
userName;
userImages;
publicImages;


  constructor(
    private httpClient:HttpClient,
    @Inject(LOCAL_STORAGE) public storage: WebStorageService
    
    ) { }

  getPublicFiles(){
    return this.httpClient.get('http://localhost:8080/api/user/getAllFiles');
  }

  getUserFiles(){
    var httpOptions = {
      headers: new HttpHeaders({        
        'x-auth': this.storage.get('token')
      })
    }
     return this.httpClient.get('http://localhost:8080/api/user/myfile',httpOptions);
  }

  makePublic(id){
    const httpOptions = {
      headers: new HttpHeaders({        
        'x-auth': this.storage.get('token')
      })
    }
     return this.httpClient.patch('http://localhost:8080/api/user/file/public/'+id,'',httpOptions);
  }

makePrivate(id){
  var httpOptions = {
    headers: new HttpHeaders({        
      'x-auth': this.storage.get('token')
    })
  }
   return this.httpClient.patch('http://localhost:8080/api/user/file/private/'+id,'',httpOptions);
}

deleteUserFile(id){
  var httpOptions = {
    headers: new HttpHeaders({        
      'x-auth': this.storage.get('token')
    })
  }
   return this.httpClient.delete('http://localhost:8080/api/user/file/'+id,httpOptions);
}
uploadUserFile(fileData) {
  var httpOptions = {
    headers: new HttpHeaders({        
      'x-auth': this.storage.get('token')
    })
  }
  console.log(this.storage.get('token'));
  return this.httpClient.post('http://localhost:8080/api/fileUpload', fileData,httpOptions);
}
}

