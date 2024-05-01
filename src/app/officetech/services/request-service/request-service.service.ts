import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {
  baseUrl: string = ""
  data: any[] = []
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getItemCount(): Observable<number> {
    return this.getItems().pipe(
      map(items => items.length) // Utiliza el método length para obtener la cantidad de elementos en el array
    );
  }

  getItems() {
    return this.http.get<any>(`${this.baseUrl}/api/v1/services`)
  }

  addService(newService: any) {
    const url = `${this.baseUrl}/api/v1/services`;
    return this.http.post(url, newService);
  }
}
