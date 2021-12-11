import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TijuanaComponent } from './tijuana.component';

describe('TijuanaComponent', () => {
  let component: TijuanaComponent;
  let fixture: ComponentFixture<TijuanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TijuanaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TijuanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
