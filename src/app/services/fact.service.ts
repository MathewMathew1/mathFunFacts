import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactType } from '../../types/Facts';

@Injectable({
  providedIn: 'root'
})
export class FactService {
  private baseUrl = '/.netlify/functions/fetchFact';

  constructor(private http: HttpClient) {}

  getRandomFact(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?type=${type}`);
  }

  getFactByNumber(number: string, type: FactType): Observable<any> {
    return this.http.get(`${this.baseUrl}?number=${number}&type=${type}`);
  }

  getMultipleFacts(number: string, type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?number=${number}&type=${type}`); 
  }
}
