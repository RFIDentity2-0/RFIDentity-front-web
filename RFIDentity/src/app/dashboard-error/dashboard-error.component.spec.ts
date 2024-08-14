import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardErrorComponent } from './dashboard-error.component';

describe('DashboardErrorComponent', () => {
  let component: DashboardErrorComponent;
  let fixture: ComponentFixture<DashboardErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
