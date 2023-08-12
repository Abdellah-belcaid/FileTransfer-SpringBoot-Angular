import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url = "http://localhost:8080/api/v1"

  constructor(private http: HttpClient) { }


  public uploadFile(FormData: FormData): Observable<HttpEvent<string[]>> {

    return this.http.post<string[]>(`${this.url}/file/upload`, FormData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  public downloadFile(fileName: string): Observable<HttpEvent<Blob>> {

    return this.http.get(`${this.url}/file/download/${fileName}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    })
  }

}
