import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EscolaDataService } from '../escola-data.service';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  escolas: any[] = [];
  escolasFiltradas: any[] = [];
  filtroEscola: string = '';
  darkMode = false;
  

  constructor(private http: HttpClient, private escolaDataService: EscolaDataService, private router: Router, private toastController: ToastController) {}

  ngOnInit() {
    this.buscarEscolas();
  }

  
  buscarEscolas() {
    this.http.get<any[]>('http://157.230.55.217/api/escolas')
      .subscribe(data => {
        this.escolas = data;
        this.escolasFiltradas = data; // Inicializando escolasFiltradas com todas as escolas
      });
  }
  
  async marcarComoFavorita(escolaId: string, event: Event) {
    event.stopPropagation();
  
    const favoritos = await Storage.get({ key: 'favoritos' });
    let favoritosArray = favoritos.value ? JSON.parse(favoritos.value) : [];
  
    if (favoritosArray.includes(escolaId)) {
      this.showToast('Escola já adicionada aos favoritos!');
    } else {
      this.showToast('Escola favoritada!');
      favoritosArray.push(escolaId);
      await Storage.set({
        key: 'favoritos',
        value: JSON.stringify(favoritosArray)
      });
    }
  }
  
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: 'toast', //class do toast
      position: 'middle'
    });
    toast.present();
  }

  filtrarEscolas(valorBusca: string) {
    if (!valorBusca) { // Filtro vazio
      this.escolasFiltradas = this.escolas; // Se o filtro estiver vazio, mostra todas as escolas
    } else {
      this.escolasFiltradas = this.escolas.filter(escola => 
        escola.noEntidade.toLowerCase().includes(valorBusca.toLowerCase()) ||
        escola.coEntidade.toString().includes(valorBusca)
      );
    }
  }
  

  limparFiltro() {
    this.filtroEscola = ''; // Limpa o campo de filtro
    this.escolasFiltradas = this.escolas; // mostrar todas as escolas
  }

  abrirDetalhesEscola(escola: any) {
    this.escolaDataService.setEscolaDetalhes(escola);
    this.router.navigate(['/detalhes-escola']);
  }

  
}
