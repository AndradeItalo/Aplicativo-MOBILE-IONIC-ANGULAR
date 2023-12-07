import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { HttpClient } from '@angular/common/http';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, ViewDidEnter {
  escolasFavoritas: any[] = [];

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    await this.carregarFavoritos();
  }

  ionViewDidEnter() {
    this.carregarFavoritos(); // Recarrega os favoritos toda vez que a página é exibida
  }

  async carregarFavoritos() {
    const favoritos = await Storage.get({ key: 'favoritos' });
    let favoritosArray = favoritos.value 
      ? JSON.parse(favoritos.value).filter((id: string) => id != null).map(Number) 
      : [];
  
    this.http.get<any[]>('http://157.230.55.217/api/escolas').subscribe(data => {
      this.escolasFavoritas = data.filter(escola => favoritosArray.includes(escola.coEntidade));
    });
    
  }
  
  async removerFavoritos(escolaId: number) { // Altere o tipo para number se coEntidade for um número
    const favoritos = await Storage.get({ key: 'favoritos' });
    let favoritosArray = favoritos.value 
      ? JSON.parse(favoritos.value).filter((id: number) => id != null) // Mantenha como number
      : [];
  
    favoritosArray = favoritosArray.filter((id: number) => id !== escolaId);
  
    await Storage.set({
      key: 'favoritos',
      value: JSON.stringify(favoritosArray)
    });
  
    this.escolasFavoritas = this.escolasFavoritas.filter(escola => escola.coEntidade !== escolaId);
  }
  
}