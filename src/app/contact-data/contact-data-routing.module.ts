import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactDataComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ContactDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactDataRoutingModule { }
