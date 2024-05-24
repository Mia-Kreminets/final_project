import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment.prod';
import { UserInfo } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  getEstimate(text: string): Observable<any> {
    return this.http.post<ApiBody>(this.getFullUrl('estimate'), { text: text });
  }

  login(data: { username: string, password: string }): Observable<ApiResponse<UserInfo>> {
    return this.http.post<ApiResponse<UserInfo>>(this.getFullUrl('user/login'), JSON.stringify(data));
  }

  signup(data: { username: string, password: string }): Observable<ApiResponse<UserInfo>> {
    return this.http.post<ApiResponse<UserInfo>>(this.getFullUrl('user'), JSON.stringify(data));
  }

  logOut() { }

  getStatistics() {

  }

  getFullUrl(url: string): string {
    return apiUrl + url;
  }
}

interface ApiBody {
  text: string;
}

interface ApiResponse<T> {
  data: T;
}