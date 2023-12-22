import { Component, OnInit } from '@angular/core';
import multiMonthPlugin from '@fullcalendar/multimonth'

@Component({
  selector: 'app-multimonth',
  templateUrl: './multimonth.component.html',
  styleUrls: ['./multimonth.component.scss']
})
export class MultimonthComponent implements OnInit {

  public multiMonthOptions: any;
  public eventData:any = [
    {
      title: 'Meeting',
      start: '2023-12-21T14:30:00',
      extendedProps: {
        status: 'done'
      }
    },
    {
      title: 'Birthday Party',
      start: '2023-12-21T07:00:00',
      backgroundColor: 'green',
      borderColor: 'green'
    },
    {
      title: 'Promoprep Meeting',
      start: '2023-12-20T05:00:00',
      backgroundColor: 'green',
      borderColor: 'green'
    },
    {
      title: 'Greena World Meeting',
      start: '2023-12-23T02:00:00',
      backgroundColor: 'green',
      borderColor: 'green'
    },
    {
      title: 'New Year',
      start: '2023-12-22T07:00:00',
      backgroundColor: 'green',
      borderColor: 'red'
    }
  ];
  constructor() { }

  ngOnInit(): void {
    this.createMultiMonthOptions();
  }

  createMultiMonthOptions(){
    this.multiMonthOptions = {
      plugins: [multiMonthPlugin],
      events: this.eventData,
      initialView: 'multiMonthYear',
      showNonCurrentDates:true, // for show prev and next months date in current month sells
      themeSystem:'bootstrap5',
      // multiMonthMaxColumns: 3,// set months columns
      views: {
        multiMonthFourMonth: {
          type: 'multiMonth',
          duration: { months: 4 }
        }
      },
      buttonText: {
        today:'Today'
      },
      editable: true,
      contentHeight: 'auto',
      selectable: false,
      // selectMirror: true,
      allDaySlot: false, //for show/hide all-day row
      slotDuration: '01:00:00', //for set slot duration
      weekends: false, //for show/hide weekends
      // hiddenDays: [ 1, 4 ] // for hide the weeks day
      // eventClick: this.handleEventClick.bind(this),
    }
  }
}
