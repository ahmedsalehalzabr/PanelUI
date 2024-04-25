import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { response } from 'express';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  //الطريقة السابقه
  // categories?: Category[];
  // constructor(private categoryServices:CategoryService) {

  // }
  // ngOnInit(): void {
  //   this.categoryServices.getAllCategories()
  //   .subscribe({
  //     next:(response) => {
  //       this.categories = response;
  //     }
  //   })
  // }

  categories$?: Observable<Category[]>;
  constructor(private categoryServices:CategoryService) {

  }
  ngOnInit(): void {
    this.categories$ = this.categoryServices.getAllCategories();
   
  }
}
