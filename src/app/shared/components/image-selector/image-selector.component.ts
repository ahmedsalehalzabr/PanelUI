import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { response } from 'express';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit{
private file?: File;
fileName:string = '';
title:string = '';
images$?: Observable<BlogImage[]>;

@ViewChild('form', {static:false}) imagUploadForm?: NgForm;

constructor (private imageService:ImageService) {

}
ngOnInit(): void {
  this.getImages();
}

onFileUploadChange(event: Event) : void {
  const element = event.currentTarget as HTMLInputElement;
  this.file = element.files?.[0];
}
uploadImage():void {
  if (this.file && this.fileName !== '' && this.title !== '')
    {
      // Image service to uploade the image
      this.imageService.uploadImage(this.file,this.fileName,this.title)
      .subscribe({
        next:(response) => {
          this.imagUploadForm?.resetForm();
          this.getImages();
        }
      })
    }
 }
  selectImage(image:BlogImage): void {
    this.imageService.selectImage(image);
  }

private getImages() {
  this.images$ = this.imageService.getAllImages();

}

}
