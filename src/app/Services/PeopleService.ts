import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { People } from '../Models/People';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'https://localhost:7140/api/People'; 
  private dataPeople = new BehaviorSubject<any>(null);
  dataPeople$ = this.dataPeople.asObservable();

  constructor(private http: HttpClient) { }

  setPeople(listaPeople: any) {
    this.dataPeople.next(listaPeople);   
  }

  post(people: People): Observable<any> {
    return this.http.post<People>(this.apiUrl, people);
  }

  get(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${nombre}`);
  }
  
  put(people: People): Observable<any> {
    return this.http.put<People>(this.apiUrl, people);
  }

  Delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}