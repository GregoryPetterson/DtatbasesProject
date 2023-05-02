import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  // The URL for the forms part of the server API
  readonly fileUrl: string = `${environment.apiUrl}files/get`;
  readonly newFilesUrl: string = `${environment.apiUrl}file/add`;

  constructor(private httpClient: HttpClient) {
  }

  getAllFiles(): Observable<File[]> {
    return this.httpClient.get<File[]>(this.fileUrl);
  }


  uploadFiles(file: File[]): Observable<string> {
    const formJson = JSON.stringify(file);
    return this.httpClient.post<{id: string}>(this.newFilesUrl, formJson).pipe(map(res => res.id));
  }
}
