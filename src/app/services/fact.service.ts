import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactType } from '../../types/Facts';

@Injectable({
  providedIn: 'root'
})
export class FactService {
  private baseUrl = 'http://numbersapi.com/';

  constructor(private https: HttpClient) {}

  getRandomFact(type: string): Observable<any> {
    return this.https.get(`${this.baseUrl}random/${type}?json`);
  }

  getFactByNumber(number: string, type: FactType): Observable<any> {
    const fact = this.https.get(`${this.baseUrl}${number}/${type}?json`)
    console.log(fact)
    return fact;
  }

  getMultipleFacts(apiUrl: string, type: string): Observable<any> {
    return this.https.get(apiUrl); 
  }
}
