import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment.development';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,private cookieService:CookieService) { }

 

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/api/Categories`);
  }

getCategoryById(id:string) : Observable<Category> {
  return this.http.get<Category>(`${environment.baseUrl}/api/Categories/${id}`);
}

addCategory(model:addCategoryRequest): Observable<void> {
  return this.http.post<void>( `${environment.baseUrl}/api/Categories?addAuth=true`,model);
}
updateCategory(id:string,updateCategoryRequest:UpdateCategoryRequest) : Observable<Category> {
  return this.http.put<Category>(`${environment.baseUrl}/api/Categories/${id}?addAuth=true`,updateCategoryRequest);
}
 
deleteCategory(id:string) : Observable<Category> {
  return this.http.delete<Category>(`${environment.baseUrl}/api/Categories/${id}?addAuth=true`);
}

}
