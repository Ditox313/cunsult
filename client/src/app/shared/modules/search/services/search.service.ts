import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Case } from 'src/app/shared/other/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  searchWidget(searchData: string): Observable<Case[]> {
    return this.http.post<Case[]>('/api/search', { searchData: searchData });
  }
}


