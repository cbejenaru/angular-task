import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {LocationInfoComponent} from './location-info/location-info.component';
import {WorkingHoursComponent} from './working-hours/working-hours.component';
import {ContactDataComponent} from './contact-data/contact-data.component';
import {PhotosComponent} from './photos/photos.component';
import {FiltersComponent} from './filters/filters.component';
import {AdditionsAndPricesComponent} from './additions-and-prices/additions-and-prices.component';
import {CongratsLastComponent} from './congrats-last/congrats-last.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/step/1', pathMatch: 'full'},
  {
    path: 'step', children: [
    {path: '1', component: LocationInfoComponent},
    {path: '2', component: WorkingHoursComponent},
    {path: '3', component: ContactDataComponent},
    {path: '4', component: PhotosComponent},
    {path: '5', component: FiltersComponent},
    {path: '6', component: AdditionsAndPricesComponent},
    {path: '7', component: CongratsLastComponent}
  ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
