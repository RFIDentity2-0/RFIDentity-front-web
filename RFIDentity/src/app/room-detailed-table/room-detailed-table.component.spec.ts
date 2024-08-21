import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailedTableComponent } from './room-detailed-table.component';

describe('RoomDetailedTableComponent', () => {
  let component: RoomDetailedTableComponent;
  let fixture: ComponentFixture<RoomDetailedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDetailedTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDetailedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
