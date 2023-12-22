import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullcalendarComponent } from './components/fullcalendar/fullcalendar.component';
import { TimeviewComponent } from './components/timeview/timeview.component';
import { ListviewComponent } from './components/listview/listview.component';
import { MultimonthComponent } from './components/multimonth/multimonth.component';

const routes: Routes = [
  {
    path:'',
    component: FullcalendarComponent
  },
  {
    path:'timeview',
    component: TimeviewComponent
  },
  {
    path:'listview',
    component: ListviewComponent
  },
  {
    path:'multi-month',
    component: MultimonthComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
