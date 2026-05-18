import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSite } from './dashboard-site';

describe('DashboardSite', () => {
  let component: DashboardSite;
  let fixture: ComponentFixture<DashboardSite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSite],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
