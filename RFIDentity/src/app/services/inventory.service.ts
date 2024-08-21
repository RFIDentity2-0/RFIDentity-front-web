import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private currentInventorySubject = new BehaviorSubject<number>(0);
  currentInventory$ = this.currentInventorySubject.asObservable();

  constructor() {}

  setCurrentInventory(inventoryId: number): void {
    this.currentInventorySubject.next(inventoryId);
    console.log('currentinventory set to ' + inventoryId);
  }

  getCurrentInventory(): number {
    console.log(
      'currentinventory get value: ' + this.currentInventorySubject.value
    );
    return this.currentInventorySubject.value;
  }
}
