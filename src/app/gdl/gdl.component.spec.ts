import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdlComponent } from './gdl.component';

describe('GdlComponent', () => {
  let component: GdlComponent;
  let fixture: ComponentFixture<GdlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GdlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
