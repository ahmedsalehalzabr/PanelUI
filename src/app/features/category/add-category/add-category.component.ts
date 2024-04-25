import { Component, OnDestroy } from '@angular/core';
import { addCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {

model: addCategoryRequest;
private addCategorySubscribtion?:Subscription;

constructor(private categoryServices:CategoryService,
  private router:Router) {
  this.model ={
    name:'',
    urlHandle:''
  };
}
 

  onFormSubmit() {
    this.addCategorySubscribtion =  this.categoryServices.addCategory(this.model)
     .subscribe({
      next: (response) => { 
         this.router.navigateByUrl('/admin/categories')
      }
     })
  }
// في وقت لاحق عندما تحتاج إلى إلغاء الاشتراك
  ngOnDestroy(): void {
    this.addCategorySubscribtion?.unsubscribe();
  }
}
