import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FileuploadService } from '../fileupload.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './file-upload-form.component.html',
  styleUrls: ['./file-upload-form.component.css']
})
export class FileUploadFormComponent implements OnInit {
  File;
myGroup = new FormGroup({
    Name: new FormControl(),
    File: new FormControl(),
    accessible: new FormControl(false)
    });
  constructor(public fileService: FileuploadService,
    public fileDialogRef: MatDialogRef<FileUploadFormComponent>,)
   { }

  ngOnInit() {
  }
  closePopup(){
    this.fileDialogRef.close();
  }
  userFileUpload(event,name){
    this.File = <File>event.target.files[0];
  }
  onSubmit(){
    // console.log(this.myGroup.value)
    const formData = new FormData();
    formData.append('file',this.File);
    formData.append('accessible',this.myGroup.value.accessible);
    this.fileService.uploadUserFile(formData).subscribe(res => {
      this.fileService.getPublicFiles().subscribe(response=>{
        this.fileService.publicImages=response;
      })
      this.fileService.getUserFiles().subscribe(data=>{
        this.fileService.userImages =data;  
      })
      this.fileDialogRef.close();

    })
}

}
