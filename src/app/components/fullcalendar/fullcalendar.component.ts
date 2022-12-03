import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, FullCalendarComponent } from '@fullcalendar/angular';
// import rrulePlugin from '@fullcalendar/rrule'
import dayGridPlugin from '@fullcalendar/daygrid'
import { ClosePopupServiceService } from 'src/app/service/close-popup-service.service';
import * as moment from "moment";
import * as momentTimezone from "moment-timezone";
import * as _ from "lodash";
declare var $: any;
@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.scss']
})
export class FullcalendarComponent implements OnInit {



  public eventGuid = 0;
  public calendarVisible = true;
  public showPromoModal!: boolean;
  public currentData: any;
  public currentEventId: any;
  public formData: any;
  public calendarOptions: CalendarOptions = {};
  public timeOptions: CalendarOptions = {};
  @ViewChild('calendar') calendar!: FullCalendarComponent;

  public eventData:any;

  // public calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   // dateClick: this.handleDateClick.bind(this),
  //   events: this.eventData,
  //   customButtons: {
  //     btnBloquearAgenda: {
  //       icon: 'fa fa-lock',
  //       click: function () {
  //         alert('clicked the custom button!');
  //       }
  //     }
  //   },
  //   // headerToolbar: {
  //   //   left: 'prev,next today btnBloquearAgenda dayGridMonth',
  //   //   right: ''
  //   // },
  //   editable: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true,
  //   headerToolbar: false,
  //   select: this.handleDateSelect.bind(this),
  //   eventClick: this.handleEventClick.bind(this),
  // };
  
  
  constructor(private dataService:ClosePopupServiceService) { }

  ngOnInit(): void {
    this.customEvent();
    this.getData()
  }

  public customEvent(): void {
    this.calendarOptions = {
      events: [],
      initialView: 'dayGridMonth',
      // dateClick: this.handleDateClick.bind(this),
      customButtons: {
        btnBloquearAgenda: {
          icon: 'fa fa-lock',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      editable: true,
      contentHeight: '1200px',
      selectable: true,
      selectMirror: true,
      eventTextColor :'black',
      // dayMaxEvents: true, //this is for show more button
      fixedWeekCount: false, //this is for show one week extra
      headerToolbar: false,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDrop: this.onEventDrop.bind(this),
      eventResize: this.onEventResize.bind(this),
    };
    // this.timeOptions = {
    //   events: this.eventData,
    //   initialView: 'timelineYear',
    //   dateClick: this.handleDateClick.bind(this),
    //   customButtons: {
    //     btnBloquearAgenda: {
    //       icon: 'fa fa-lock',
    //       click: function () {
    //         alert('clicked the custom button!');
    //       }
    //     }
    //   },
    //   views:{
    //     duration: { weeks: 2 },
    //   },
    //   editable: true,
    //   contentHeight: 'auto',
    //   selectable: true,
    //   selectMirror: true,
    //   // dayMaxEvents: true,
    //   // allDaySlot:false,
    //   headerToolbar: false,
    //   select: this.handleDateSelect.bind(this),
    //   eventClick: this.handleEventClick.bind(this),
    //   eventDrop: this.onEventDrop.bind(this),
    //   eventResize: this.onEventResize.bind(this),
    // }
    $("#m_calendar").find(".fc-timegrid").find(".fc-daygrid-body tr td:first-child").remove()
  }

  onEventResize(event:any): void{
    console.log('event', event);
  }

  onEventDrop(event:any): void{
    console.log('eventDrop', event)
  }
  handleDateClick(arg:any): void{
    alert('date click! ' + arg.dateStr);
  }

  public getData(){
    // this.eventData = this.dataService.getData();
    // console.log('this.eventData :>> ', this.eventData);
    // setTimeout(() => {
    //   this.calendar.getApi().addEventSource(this.eventData);
    // }, 0);

    this.dataService.getPromoData().subscribe((res:any)=>{
      this.eventData = this.createCalenderPromoObjs(res['promos']);
      setTimeout(() => {
      this.calendar.getApi().addEventSource(this.eventData);
    }, 0);
    })
  }

  public removeAllEvents(){
    this.calendar.getApi().removeAllEvents();
  }
  // handleEventClick(clickInfo: EventClickArg) {
  //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //     clickInfo.event.remove();
  //   }
  // }

  public nextDate(arg:number) {
    if (arg>0) {
      this.calendar.getApi().next();
    } else {
      this.calendar.getApi().prev();
    }
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    this.currentData = selectInfo;
    this.showPromoModal = true;
    alert('Hello')
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
    this.showPromoModal = false;
  }


  public getFormData(e: any): void {
    var id = this.eventData.length + 1;
    console.log('this.currentData', this.currentData)
    if (this.currentEventId) {
      const calendarApi1 = this.currentData._context.viewApi.calendar;
      calendarApi1.updateEvent({
        id: id?.toString(),
        title: e.eventName,
        start: e.startDate,
        end: e.endDate,
        color: e.colorCode,
        description: e.descrption
      })
    } else {
      const calendarApi = this.currentData.view.calendar;
      calendarApi.addEvent({
        id: id?.toString(),
        title: e.eventName,
        start: e.startDate,
        end: e.endDate,
        color: e.colorCode,
        description: e.descrption
      });
    }


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

  public getTitle(promo:any) {
    if (promo.from_date === promo.to_date) {
      return promo.name;
    }
    return (
      promo.name +
      ": " +
      " (" +
      moment(promo.from_date).format("M/D") +
      "-" +
      moment(promo.to_date).format("M/D") +
      ")"
    );
  }
  getCalPromoObj(promo:any, updateTime?: boolean) {
    const obj: any = {};

    obj.custom_id = promo.id;
    obj.color = promo.color_code;
    obj.category_id = promo.category_id;
    obj.id = promo.id;
    obj.name = promo.name;
    obj.title = this.getTitle(promo);

    obj.from_date = promo["from_date"];
    obj.to_date = promo["to_date"];
    obj.start = new Date(
      momentTimezone(
        promo["from_date"] + " " + promo.start_time,
        "YYYY-MM-DD HH:mm"
      ).toISOString()
    );
    obj.start = momentTimezone(obj.start).format("YYYY-MM-DD");
    obj.start_time = promo.start_time;
    obj.end = new Date(
      momentTimezone(
        promo["to_date"] + " " + promo.end_time,
        "YYYY-MM-DD HH:mm"
      ).toISOString()
    );
    obj.end = momentTimezone(obj.end).add(1, "days").format("YYYY-MM-DD");
    obj.end_time = promo.end_time;

    if (!updateTime)
      obj.className = "m-fc-event--solid-focus m-fc-event--light";

    obj.description = promo.description;

    if (promo.recurrence) {
      obj.recurrence = promo.recurrence;
    }
    return obj;
  }
  createCalenderPromoObjs(promoList:any) {
    let obj: any = {};
    const promos: any = [];
    for (let index = 0; index < promoList.length; index++) {
      obj = _.clone(this.getCalPromoObj(promoList[index]));
      promos.push(obj);
    }
    return promos;
  }

}
