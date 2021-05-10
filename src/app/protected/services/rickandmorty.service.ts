import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  resultados: any = [];

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(
      'https://rickandmortyapi.com/api/character/?status=alive'
    );
  }
}
