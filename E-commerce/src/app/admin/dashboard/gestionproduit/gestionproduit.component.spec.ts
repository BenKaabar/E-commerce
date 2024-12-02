import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionproduitComponent } from './gestionproduit.component';

describe('GestionproduitComponent', () => {
  let component: GestionproduitComponent;
  let fixture: ComponentFixture<GestionproduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionproduitComponent]
    });
    fixture = TestBed.createComponent(GestionproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
