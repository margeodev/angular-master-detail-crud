import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl: string = "api/categories";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiUrl);
  }

  getById(id: string):Observable<Category>{
    return this.httpClient.get<Category>(`${this.apiUrl}/${id}`);
  }

  create(category: Category):Observable<Category> {
    return this.httpClient.post<Category>(this.apiUrl, category);
  }

  update(id: number, category: Category):Observable<Category> {
    return this.httpClient.put<Category>(`${this.apiUrl}/${id}`, category);
  }

  delete(id: number):Observable<Category> {
    return this.httpClient.delete<Category>(`${this.apiUrl}/${id}`);
  }
  
}
