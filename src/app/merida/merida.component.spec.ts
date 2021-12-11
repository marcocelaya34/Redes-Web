import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeridaComponent } from './merida.component';

describe('MeridaComponent', () => {
  let component: MeridaComponent;
  let fixture: ComponentFixture<MeridaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeridaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
