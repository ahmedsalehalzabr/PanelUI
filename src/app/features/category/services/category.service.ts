import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(model:addCategoryRequest): Observable<void> {
    return this.http.post<void>( 'https://localhost:7289/api/Categories',model);
  }
}
