import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscolaDataService {
  private escolaDetalhesSource = new BehaviorSubject<any>(null);
  private apiUrl = 'http://157.230.55.217/api/escolas';

  constructor(private http: HttpClient) {}

  buscarEscolas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  escolaDetalhes = this.escolaDetalhesSource.asObservable();

  setEscolaDetalhes(detalhes: any) {
    this.escolaDetalhesSource.next(detalhes);
  }
}
