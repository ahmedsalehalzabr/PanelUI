import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';

import { UpdateCategoryRequest } from '../models/update-category-request.model';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit , OnDestroy {

id: string | null = null;
paramsSubscription?: Subscription;
editCategorySubscription?: Subscription;
category? : Category;

  constructor (private route: ActivatedRoute, private categoryServices: CategoryService,
   private router:Router) {

  }

  onFormSubmit(): void {
     const updateCategoryRequest : UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
     };

     if(this.id)
      {
        this.categoryServices.updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          }
        });
      }
  }

ngOnInit(): void {
 this.paramsSubscription = this.route.paramMap.subscribe({
    next: (params) => {
      this.id = params.get('id');


      if (this.id)
        {
         this.editCategorySubscription = this.categoryServices.getCategoryById(this.id)
          .subscribe({
            next : (response) => {
              this.category = response;
            }
          });
        }
    }
  })

}
ngOnDestroy(): void {
  this.paramsSubscription?.unsubscribe();
  this.editCategorySubscription?.unsubscribe();
}
}
