import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ListaEscolasPage } from './listaEscolas.page';

describe('ListaEscolasPage', () => {
  let component: ListaEscolasPage;
  let fixture: ComponentFixture<ListaEscolasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaEscolasPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaEscolasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
