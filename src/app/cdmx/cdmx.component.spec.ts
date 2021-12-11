import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmxComponent } from './cdmx.component';

describe('CdmxComponent', () => {
  let component: CdmxComponent;
  let fixture: ComponentFixture<CdmxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdmxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
