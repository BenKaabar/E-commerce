import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioncategorieComponent } from './gestioncategorie.component';

describe('GestioncategorieComponent', () => {
  let component: GestioncategorieComponent;
  let fixture: ComponentFixture<GestioncategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestioncategorieComponent]
    });
    fixture = TestBed.createComponent(GestioncategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
