import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomtableComponent } from './roomtable.component';

describe('RoomtableComponent', () => {
  let component: RoomtableComponent;
  let fixture: ComponentFixture<RoomtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomtableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
