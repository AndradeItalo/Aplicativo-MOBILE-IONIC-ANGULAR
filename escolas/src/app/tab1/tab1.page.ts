import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  escolas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.buscarEscolas();
  }

  
  buscarEscolas() {
    this.http.get<any[]>('http://157.230.55.217/api/escolas') // Fazer uma chamada HTTP para a API para buscar a lista de escolas
      .subscribe(data => {
        this.escolas = data;
      });
  }

  marcarComoFavorita(escolaId: string) {
    // Lógica para marcar a escola como favorita
    // Utilize a lógica de armazenamento local ou outras ações necessárias
  }
}
