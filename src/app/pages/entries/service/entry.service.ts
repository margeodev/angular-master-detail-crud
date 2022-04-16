import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Entry } from '../../entries/model/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  apiUrl: string = "api/entries";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.httpClient.get<Entry[]>(this.apiUrl);
  }

  getById(id: string):Observable<Entry>{
    return this.httpClient.get<Entry>(`${this.apiUrl}/${id}`);
  }

  create(entry: Entry):Observable<Entry> {
    return this.httpClient.post<Entry>(this.apiUrl, entry);
  }

  update(id: number, entry: Entry):Observable<Entry> {
    return this.httpClient.put<Entry>(`${this.apiUrl}/${id}`, entry);
  }

  delete(id: number):Observable<Entry> {
    return this.httpClient.delete<Entry>(`${this.apiUrl}/${id}`);
  }
}
