import { Component, OnInit, ViewChild } from '@angular/core';
// import { DateSelectArg, EventClickArg, FullCalendarComponent } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss']
})
export class ListviewComponent implements OnInit {

  // @ViewChild('calendar') calendar!: FullCalendarComponent;

  public listOptions: any;
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
  public currentData: any;
  public currentEventId: any;
  public formData: any;
  public showPromoModal!: boolean;
  constructor() { }

  ngOnInit(): void {
    this.createTimeLine();
  }

  createTimeLine(){
    this.listOptions = {
      plugins: [listPlugin],
      events: this.eventData,
      initialView: 'listWeek',
      dateClick: this.handleDateSelect.bind(this),
      headerToolbar: {
        left: 'prev,next,today',
        center: 'title',
        right: 'listDay,listWeek,listMonth,listYear' // user can switch between the two
      },
      buttonText: {
        listDay: 'List Day', // Customize the "today" button text
        listWeek:'List Week',
        listMonth:'List Month',
        listYear:'List Year',
        today:'Today'
      },
      editable: true,
      contentHeight: 'auto',
      selectable: false,
      allDaySlot: true, //for show/hide all-day row
      // weekends: false, //for show/hide weekends
      // hiddenDays: [ 1, 4 ] // for hide the weeks day
      eventClick: this.handleEventClick.bind(this),
    }
  }

  handleDateSelect(selectInfo: any) {
    this.currentData = selectInfo;
    this.showPromoModal = true;
    // alert('Hello');
    // selectInfo.event.remove();
  }

  handleEventClick(clickInfo: any) {
    const isTitle = clickInfo.event._def.title;
    this.currentEventId = clickInfo.event._def.publicId;
    if (isTitle) {
      this.showPromoModal = true;
      this.currentData = clickInfo.event;
    }
    // clickInfo.event.remove();
  }

}
