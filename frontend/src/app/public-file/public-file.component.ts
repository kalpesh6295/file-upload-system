import { Component, OnInit } from '@angular/core';
import { FileuploadService } from '../fileupload.service';

@Component({
  selector: 'app-public-file',
  templateUrl: './public-file.component.html',
  styleUrls: ['./public-file.component.css']
})
export class PublicFileComponent implements OnInit {
images;
  constructor(public fileService:FileuploadService) { }

  ngOnInit() {
    this.getAllPublicFiles();
  }
  getAllPublicFiles(){
    this.fileService.getPublicFiles().subscribe(data=>{
     this.fileService.publicImages=data;
    });

  }

}
