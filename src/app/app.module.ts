import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullcalendarComponent } from './components/fullcalendar/fullcalendar.component';
import { EventformComponent } from './components/eventform/eventform.component'; // a plugin!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { FontAwesomeModule } from 'font-awesome';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NetworkGraphComponent } from './components/network-graph/network-graph.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { TimeviewComponent } from './components/timeview/timeview.component';
import { ListviewComponent } from './components/listview/listview.component';
import { MultimonthComponent } from './components/multimonth/multimonth.component';

@NgModule({
  declarations: [
    AppComponent,
    FullcalendarComponent,
    EventformComponent,
    NetworkGraphComponent,
    HeaderComponent,
    TimeviewComponent,
    ListviewComponent,
    MultimonthComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // FontAwesomeModule,
    AppRoutingModule,
    FullCalendarModule,
    HighchartsChartModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
