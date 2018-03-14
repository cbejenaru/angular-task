import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LocationInfoComponent } from './location-info/location-info.component';
import { WorkingHoursComponent } from './working-hours/working-hours.component';
import { ContactDataComponent } from './contact-data/contact-data.component';
import { PhotosComponent } from './photos/photos.component';
import { FiltersComponent } from './filters/filters.component';
import { AdditionsAndPricesComponent } from './additions-and-prices/additions-and-prices.component';
import { CongratsLastComponent } from './congrats-last/congrats-last.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/step/1', pathMatch: 'full' },
  {
    path: 'step',
    children: [
      {
        path: '1',
        loadChildren:
          'app/location-info/location-info.module#LocationInfoModule',
      },
      {
        path: '2',
        loadChildren:
          'app/working-hours/working-hours.module#WorkingHoursModule',
      },
      {
        path: '3',
        loadChildren: 'app/contact-data/contact-data.module#ContactDataModule',
      },
      {
        path: '4',
        loadChildren: 'app/photos/photos.module#PhotosModule',
      },
      {
        path: '5',
        loadChildren: 'app/filters/filters.module#FiltersModule',
      },
      {
        path: '6',
        loadChildren:
          'app/additions-and-prices/additions-and-prices.module#AdditionsAndPricesModule',
      },
      {
        path: '7',
        loadChildren:
          'app/congrats-last/congrats-last.module#CongratsLastModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
