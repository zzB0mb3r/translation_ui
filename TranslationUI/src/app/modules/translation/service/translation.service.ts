import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Translation } from '../models/translation.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private http: HttpClient) {}

  translate(formData: Translation): Observable<Translation> {
    return this.http.post<Translation>(environment.translateServiceUri + '/translation/translate', formData);
  }
}
