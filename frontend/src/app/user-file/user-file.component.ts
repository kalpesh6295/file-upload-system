import { Component, OnInit, Inject } from '@angular/core';
import { FileuploadService } from '../fileupload.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.css']
})
export class UserFileComponent implements OnInit {
images;
clicked = false;
  constructor(
    public fileService:FileuploadService,
    @Inject(LOCAL_STORAGE) public storage: WebStorageService

    ) { }

  ngOnInit() {
    console.log('i am here')
    this.getUserFile();
  }
menuClick(){
this.clicked = !this.clicked;
}

  getUserFile(){
    this.fileService.getUserFiles().subscribe(data=>{
      this.fileService.userImages = data;
      console.log(data);
    })
  }

  makePrivate(id){
 
    this.fileService.makePrivate(id).subscribe(res=>{
      console.log(res);
      alert('your file is now private');
    });
  
  }
  makePublic(id){
   
      this.fileService.makePublic(id).subscribe(res=>{
        console.log(res);
        alert('your file is now public');
      });
    
    
    }
    deleteFile(id){
     if(confirm("Are you sure, you want to delete this file?")){
      this.fileService.deleteUserFile(id).subscribe(res=>{
        this.fileService.getUserFiles().subscribe(response=>{
          this.fileService.userImages = response;
        })
      })
     };
    }

}
