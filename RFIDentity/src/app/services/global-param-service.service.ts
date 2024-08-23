import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalParamService {
  currentInventory: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    // Listen to navigation events to append the currentInventory to all routes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const urlTree = this.router.parseUrl(event.url);
        if (this.currentInventory) {
          urlTree.queryParams = {
            ...urlTree.queryParams,
            inventoryId: this.currentInventory,
          };
          event.url = urlTree.toString();
        }
      }
    });

    // Initialize the currentInventory from the URL query parameters
    this.route.queryParams.subscribe((params) => {
      if (params['inventoryId']) {
        this.currentInventory = +params['inventoryId'];
      }
    });
  }

  setCurrentInventory(inventoryId: number) {
    this.currentInventory = inventoryId;
    this.router.navigate([], {
      queryParams: { inventoryId: this.currentInventory },
      queryParamsHandling: 'merge',
    });
  }

  getCurrentInventory(): number | null {
    return this.currentInventory;
  }
}
