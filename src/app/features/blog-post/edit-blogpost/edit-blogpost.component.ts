import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogPostModel } from '../models/update-blog-post.model';
import { response } from 'express';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
id:string | null = null;
model?:BlogPost;
categories$?: Observable<Category[]>;
selectedCategory?: string[];
isImageSelectorVisible : boolean = false;

routeSubscription?: Subscription;
updateBlogPostSubscription?: Subscription;
getBlogPostSubscription?: Subscription;
deleteBlogPostSubscription?: Subscription;
imageSelectSubscricption?: Subscription;

constructor(private route: ActivatedRoute,
  private blogPostService:BlogPostService,
  private categoryService:CategoryService,
  private router:Router,
  private imageService: ImageService){

}
 
ngOnInit(): void {

this.categories$ = this.categoryService.getAllCategories();

  this.routeSubscription = this.route.paramMap.subscribe({
    next: (params) => {
      this.id = params.get('id');

      //Get BlogPost From API
      if(this.id) {
        this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe
        ({
          next: (response) => {
            this.model = response;
            this.selectedCategory = response.categories.map(x => x.id);
          }
        });
      }
      this.imageSelectSubscricption = this.imageService.onSelectImage()
      .subscribe({
        next: (response) => {
          if (this.model) {
            this.model.featuredImageUrl = response.url;
            this.isImageSelectorVisible = false;
          }
        }
      })
    }
  });
}

onFormSubmit(): void {
 // Convert this model to Request Object
 if (this.model && this.id) {
  var updateBlogPost: UpdateBlogPostModel = {
    author: this.model.author,
    content: this.model.content,
    shortDescription: this.model.shortDescription,
    featuredImageUrl: this.model.featuredImageUrl,
    isVisible: this.model.isVisible,
    publishedDate: this.model.publishedDate,
    title: this.model.title,
    urlHandle: this.model.urlHandle,
    categories: this.selectedCategory ?? []
  };

  this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
  .subscribe({
    next: (response) => {
      this.router.navigateByUrl('/admin/blogposts');
    }
  });
}
}

onDelete(): void {
  if (this.id) {
    //cal service and delete blogpost
    this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe
    ({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }

}
openImageSelector() :void {
  this.isImageSelectorVisible = true;
}

closeImageSelector() : void {
  this.isImageSelectorVisible = false;
}

ngOnDestroy(): void {
  this.routeSubscription?.unsubscribe();
  this.updateBlogPostSubscription?.unsubscribe();
  this.getBlogPostSubscription?.unsubscribe();
  this.deleteBlogPostSubscription?.unsubscribe();
  this.imageSelectSubscricption?.unsubscribe();
}


}
