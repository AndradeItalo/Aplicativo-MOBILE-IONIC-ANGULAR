import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EscolaDataService } from '../escola-data.service';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { ToastController } from '@ionic/angular';
import { FavoritosService } from '../favoritos.service';

@Component({
  selector: 'app-lista-escolas',
  templateUrl: 'listaEscolas.page.html',
  styleUrls: ['listaEscolas.page.scss']
})
export class ListaEscolasPage implements OnInit {
  escolas: any[] = []; // Array para armazenar as escolas 
  escolasFiltradas: any[] = []; // Escolas filtradas
  filtroEscola: string = '';
  
  constructor(
    private escolaDataService: EscolaDataService, 
    private router: Router, 
    private toastController: ToastController,
    private favoritosService: FavoritosService,) {}

    // Carrega as escolas quando o componente é inicializado.
  ngOnInit() {
    this.carregarEscolas();
  }

    // Carrega a lista de escolas da API.
  carregarEscolas() {
    this.escolaDataService.buscarEscolas()
      .subscribe(
        (data: any[]) => { // Dados recebidos da API.
          this.escolas = data;
          this.escolasFiltradas = data;
        },
        (error: any) => { // Se não conseguir buscar os dados da API, entra nesse caso.
          console.error('Erro ao buscar escolas', error);
        }
      );
  }
  
  async marcarComoFavorita(escolaId: string, event: Event) {
    event.stopPropagation();  // Impede a propagação do evento para elementos pai (cards)

    // Verifica se a escola foi favoritada com sucesso.
    const foiFavoritada = await this.favoritosService.marcarComoFavorita(escolaId);
    if (foiFavoritada) {
      this.showToast('Escola favoritada!');
    } else {
      this.showToast('Escola já adicionada aos favoritos!');
    }
  }
  
  // Exibe uma mensagem rápida (toast) para o usuário, se a escola foi favoritada ou não.
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: 'toast', // Classe CSS para o toast
      position: 'middle' // Posiciona o toast no meio da tela
    });
    toast.present();
  }

  // Filtra as escolas com base no texto inserido no campo de busca.
  filtrarEscolas(buscarEscola: string) {
    if (!buscarEscola) { // Filtro vazio
      this.escolasFiltradas = this.escolas; // Se o filtro estiver vazio, mostra todas as escolas
    } else {
      this.escolasFiltradas = this.escolas.filter(escola => 
        escola.noEntidade.toLowerCase().includes(buscarEscola.toLowerCase()) || // Aplica o filtro baseado no nome da escola
        escola.coEntidade.toString().includes(buscarEscola) // Aplica o filtro baseado no código da escola
      );
    }
  }
  
  limparFiltro() {
    this.filtroEscola = ''; // Limpa o campo de filtro
    this.escolasFiltradas = this.escolas; // mostrar todas as escolas
  }

  // Abre a página de detalhes para a escola selecionada
  abrirDetalhesEscola(escola: any) {
    this.escolaDataService.setEscolaDetalhes(escola);
    this.router.navigate(['/detalhes-escola']);
  }
}
