import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomtileComponent } from './roomtile.component';

describe('RoomtileComponent', () => {
  let component: RoomtileComponent;
  let fixture: ComponentFixture<RoomtileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomtileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomtileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
