import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cheese } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://thirtyxthirty-lessons.herokuapp.com/cheeses';


@Injectable({
  providedIn: 'root'
})
export class CheesesService {

  constructor(private http: HttpClient) { }

  all(): Observable<[Cheese]>{
    return this.http.get<[Cheese]>(BASE_URL);
  }

  byId(id): Observable<Cheese>{
    return this.http.get<Cheese>(this.getUrl(id));
  }

  create(cheese: Cheese): Observable<Cheese>{
    return this.http.post<Cheese>(BASE_URL, cheese);
  }

  update(cheese: Cheese): Observable<Cheese>{
    return this.http.put<Cheese>(this.getUrl(cheese.id), cheese);
  }

  delete(id): Observable<Cheese>{
    return this.http.delete<Cheese>(this.getUrl(id));
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
