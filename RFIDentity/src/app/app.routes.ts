import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { RoomsComponent } from './rooms/rooms.component';
import { DashboardErrorComponent } from './dashboard-error/dashboard-error.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'rooms',
    component: RoomsComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
  {
    path: '404',
    component: DashboardErrorComponent,
  },
];
