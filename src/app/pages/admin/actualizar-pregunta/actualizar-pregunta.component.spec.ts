import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPreguntaComponent } from './actualizar-pregunta.component';

describe('ActualizarPreguntaComponent', () => {
  let component: ActualizarPreguntaComponent;
  let fixture: ComponentFixture<ActualizarPreguntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarPreguntaComponent]
    });
    fixture = TestBed.createComponent(ActualizarPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
