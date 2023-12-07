import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscolaDataService {
  private escolaDetalhesSource = new BehaviorSubject<any>(null);
  escolaDetalhes = this.escolaDetalhesSource.asObservable();

  setEscolaDetalhes(detalhes: any) {
    this.escolaDetalhesSource.next(detalhes);
  }
}
