import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Country } from "../interfaces/country";
import { environment } from "../../environments/environment";
import { World } from "../interfaces/world";
const apiUrl = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor(
    private http: HttpClient
  ) { }

  getWorldLiveData(): Observable<World> {
    return this.http.get<World>(`${apiUrl}/world/total`);
  }
  getLiveByContryAllStatus(country: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${apiUrl}/live/country/${country}`);
  }
}
