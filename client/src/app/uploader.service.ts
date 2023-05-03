import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Stats } from './stats';


@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  // The URL for the forms part of the server API
  readonly fileUrl: string = `${environment.apiUrl}files/get`;
  readonly newFilesUrl: string = `${environment.apiUrl}files/post`;

  constructor(private httpClient: HttpClient) {
  }

  getAllFiles(): Observable<File[]> {
    return this.httpClient.get<File[]>(this.fileUrl);
  }


  uploadFile(file: File): Observable<string> {
    // Assuming you have a JSON string called 'fileJson'
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post<{id: string}>(this.newFilesUrl, file).pipe(map(res => res.id));
  }
}
