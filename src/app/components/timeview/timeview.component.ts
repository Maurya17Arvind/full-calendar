import interactionPlugin from '@fullcalendar/interaction';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import timeGridPlugin from "@fullcalendar/timegrid";

@Component({
  selector: 'app-timeview',
  templateUrl: './timeview.component.html',
  styleUrls: ['./timeview.component.scss']
})
export class TimeviewComponent implements OnInit {

  @ViewChild('calendar') calendar!: FullCalendarComponent;

  public timeOptions: any;
  public currentData: any;
  public currentEventId: any;
  public formData: any;
  public eventData:any = [];
  public showPromoModal!: boolean;


  constructor() { }

  ngOnInit(): void {
    this.createTimeLine();
  }

  createTimeLine(){
    this.timeOptions = {
      plugins: [timeGridPlugin,interactionPlugin],
      events: this.eventData,
      initialView: 'timeGridWeek',
      dateClick: this.handleDateSelect.bind(this),
      // customButtons: {
      //   btnBloquearAgenda: {
      //     icon: 'fa fa-lock',
      //     click: () => {
      //       alert('clicked the custom button!');
      //     }
      //   }
      // },
      headerToolbar: {
        left: 'prev,next,today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay' // user can switch between the two
      },
      buttonText: {
        today: 'Radhe Radhe(TD)', // Customize the "today" button text
        week:'Week',
        day:'Day'
      },
      editable: true,
      contentHeight: 'auto',
      selectable: false,
      // selectMirror: true,
      allDaySlot: false, //for show/hide all-day row
      slotDuration: '01:00:00', //for set slot duration
      weekends: false, //for show/hide weekends
      // hiddenDays: [ 1, 4 ] // for hide the weeks day
      eventClick: this.handleEventClick.bind(this),
    }
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.currentData = selectInfo;
    this.showPromoModal = true;
    // alert('Hello');
    // selectInfo.event.remove();
  }

  handleEventClick(clickInfo: EventClickArg) {
    const isTitle = clickInfo.event._def.title;
    this.currentEventId = clickInfo.event._def.publicId;
    if (isTitle) {
      this.showPromoModal = true;
      this.currentData = clickInfo.event;
    }
    // clickInfo.event.remove();
  }

  onShowDrawer(event: any) {
    console.log('event :>> ', event);
    this.showPromoModal = false;
  }

  getCalendar(){
    return this.calendar.getApi();
  }

  public getFormData(e: any): void {
    var id = this.currentEventId ? this.currentEventId : this.eventData.length ? this.eventData.length + 1 : 1;
    const event = this.getCalendar().getEventById(this.currentEventId);
    console.log('event :>> ', event);
    const data = {
      id: id?.toString(),
      title: e.eventName,
      start: e.startDate + 'T' + e.startTime,
      end: e.endDate + 'T' + e.endTime,
      color: e.colorCode,
      description: e.descrption
    };
    if (event){
      event.remove();
      const index = this.eventData.findIndex((res:any)=> res.id === this.currentEventId);
      console.log('index :>> ', index);
      this.eventData.splice(index,1);
    } 
    this.getCalendar().addEvent(data);
    this.eventData.push(data);
    console.log('this.eventData :>> ', this.eventData);
    this.currentEventId = '';
    // calendarApi.addEvent({
    //   id: id?.toString(),
    //   title: e.eventName,
    //   start: e.startDate + 'T' + e.startTime,
    //   end: e.endDate + 'T' + e.endTime,
    //   color: e.colorCode,
    //   description: e.descrption
    // });
    // this.formData = {
    //   id: id?.toString(),
    //   title: e.eventName,
    //   start: e.startDate,
    //   end: e.endDate,
    //   color: e.colorCode,
    //   description: e.descrption
    // }
    // this.eventData = [...this.eventData, this.formData];

    // this.customEvent();
    // console.log('this.formData', this.formData)
    
  }


}
