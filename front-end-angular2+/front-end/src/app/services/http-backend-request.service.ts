import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class HttpBackendRequestService {

  constructor(private http: HttpClient) { }

  realizarHttpPost(requestType: string, bodyObject: Object) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(requestType, bodyObject, {
                            headers: headers
                          });
  }

}
