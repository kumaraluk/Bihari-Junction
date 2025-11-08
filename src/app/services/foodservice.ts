import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = "http://localhost:5000/api/food";

  constructor(private http: HttpClient) {}

  getFoods(): Observable<any> {
    const token = localStorage.getItem("token") || "";

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`         // <-- Token added here
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
