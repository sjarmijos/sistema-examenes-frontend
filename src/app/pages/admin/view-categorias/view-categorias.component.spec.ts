import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoriasComponent } from './view-categorias.component';

describe('ViewCategoriasComponent', () => {
  let component: ViewCategoriasComponent;
  let fixture: ComponentFixture<ViewCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCategoriasComponent]
    });
    fixture = TestBed.createComponent(ViewCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
