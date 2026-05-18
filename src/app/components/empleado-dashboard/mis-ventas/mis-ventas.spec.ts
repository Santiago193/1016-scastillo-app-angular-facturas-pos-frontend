import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisVentas } from './mis-ventas';

describe('MisVentas', () => {
  let component: MisVentas;
  let fixture: ComponentFixture<MisVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisVentas],
    }).compileComponents();

    fixture = TestBed.createComponent(MisVentas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
