import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamenComponent } from './add-examen.component';

describe('AddExamenComponent', () => {
  let component: AddExamenComponent;
  let fixture: ComponentFixture<AddExamenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExamenComponent]
    });
    fixture = TestBed.createComponent(AddExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
