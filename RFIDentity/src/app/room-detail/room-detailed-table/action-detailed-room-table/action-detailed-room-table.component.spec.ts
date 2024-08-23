import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDetailedRoomTableComponent } from './action-detailed-room-table.component';

describe('ActionDetailedRoomTableComponent', () => {
  let component: ActionDetailedRoomTableComponent;
  let fixture: ComponentFixture<ActionDetailedRoomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionDetailedRoomTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionDetailedRoomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
