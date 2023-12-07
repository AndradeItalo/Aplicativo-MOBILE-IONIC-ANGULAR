import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesEscolaPage } from './detalhes-escola.page';

describe('DetalhesEscolaPage', () => {
  let component: DetalhesEscolaPage;
  let fixture: ComponentFixture<DetalhesEscolaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalhesEscolaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
