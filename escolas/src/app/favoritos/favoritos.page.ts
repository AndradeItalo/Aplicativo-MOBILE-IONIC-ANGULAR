import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { HttpClient } from '@angular/common/http';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-favoritos',
  templateUrl: 'favoritos.page.html',
  styleUrls: ['favoritos.page.scss']
})
export class FavoritosPage implements OnInit, ViewDidEnter {
  escolasFavoritas: any[] = []; // Array para armazenar as escolas favoritas

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    await this.carregarFavoritos(); // Carrega as escolas favoritas quando o componente é inicializado
  }

  ionViewDidEnter() { // Recarrega os favoritos toda vez que a página é exibida
    this.carregarFavoritos(); 
  }

    // Carrega os IDs das escolas favoritas do storage e, em seguida, busca as escolas correspondentes da API
  async carregarFavoritos() {
    const favoritos = await Storage.get({ key: 'favoritos' }); // Obtém a lista de IDs favoritos do storage
    let favoritosArray = favoritos.value 
      ? JSON.parse(favoritos.value).filter((id: string) => id != null).map(Number) 
      : [];
  
      // Busca todas as escolas e filtra para incluir apenas as favoritas
    this.http.get<any[]>('http://157.230.55.217/api/escolas').subscribe(data => {
      this.escolasFavoritas = data.filter(escola => favoritosArray.includes(escola.coEntidade));
    });
  }
  
  // Remove uma escola da lista de favoritos
  async removerFavoritos(escolaId: number) { 
    const favoritos = await Storage.get({ key: 'favoritos' }); // Obtém a lista atual de favoritos do storage
    let favoritosArray = favoritos.value 
      ? JSON.parse(favoritos.value).filter((id: number) => id != null) // Mantenha como number
      : [];
  
    favoritosArray = favoritosArray.filter((id: number) => id !== escolaId); // Filtra a lista para remover o ID especificado
  
    await Storage.set({ // Salva a lista atualizada
      key: 'favoritos',
      value: JSON.stringify(favoritosArray)
    });
  
    // Atualiza a lista de escolas favoritas para refletir a remoção
    this.escolasFavoritas = this.escolasFavoritas.filter(escola => escola.coEntidade !== escolaId);
  }
}
