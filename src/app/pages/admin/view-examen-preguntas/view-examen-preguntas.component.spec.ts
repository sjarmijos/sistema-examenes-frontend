import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExamenPreguntasComponent } from './view-examen-preguntas.component';

describe('ViewExamenPreguntasComponent', () => {
  let component: ViewExamenPreguntasComponent;
  let fixture: ComponentFixture<ViewExamenPreguntasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewExamenPreguntasComponent]
    });
    fixture = TestBed.createComponent(ViewExamenPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
