// favoritos.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  async marcarComoFavorita(escolaId: string): Promise<boolean> {
    const favoritos = await Storage.get({ key: 'favoritos' });
    let favoritosArray = favoritos.value ? JSON.parse(favoritos.value) : [];

    if (!favoritosArray.includes(escolaId)) {
      favoritosArray.push(escolaId);
      await Storage.set({
        key: 'favoritos',
        value: JSON.stringify(favoritosArray)
      });
      return true; // Escola foi adicionada aos favoritos
    } else {
      return false; // Escola já está nos favoritos
    }
  }
}
