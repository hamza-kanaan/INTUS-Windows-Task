import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
  }

  //#region Rectangle

  getRectangle(): Observable<any> {
    return this.http.get<any>(this.appConfig.data.apiUrl + 'Rectangle/Get');
  }

  updateRectangle(rectangle: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.appConfig.data.apiUrl + 'Rectangle/Update', rectangle, httpOptions);
  }

  //#endregion Rectangle
}