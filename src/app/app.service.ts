import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  readonly baseURL = 'https://61ee5f30d593d20017dbad98.mockapi.io/pinguin/api';

  getNotes() {
    return this.http.get(this.baseURL + '/notes');
  }

  getNoteLabes() {
    return this.http.get(this.baseURL + '/noteLabels');
  }

  updateNote(noteID, requestObj) {
    return this.http.put(this.baseURL + '/notes/' + noteID, requestObj)
  }
}
