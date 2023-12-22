import interactionPlugin from '@fullcalendar/interaction';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
// import rrulePlugin from '@fullcalendar/rrule'
import dayGridPlugin from '@fullcalendar/daygrid'
import { ClosePopupServiceService } from 'src/app/service/close-popup-service.service';
import * as moment from "moment";
import * as momentTimezone from "moment-timezone";
import * as _ from "lodash";
import { Calendar } from '@fullcalendar/core';
declare var $: any;
@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.scss']
})
export class FullcalendarComponent implements OnInit, AfterViewInit {



  public eventGuid = 0;
  public calendarVisible = true;
  public showPromoModal!: boolean;
  public currentData: any;
  public currentEventId: any;
  public formData: any;
  public calendarOptions: any = {};
  public timeOptions: any = {};
  @ViewChild('calendar') calendar!: FullCalendarComponent;

  public eventData:any = [];
  
  constructor(private dataService:ClosePopupServiceService) { }

  ngOnInit(): void {
    this.customEvent();
    // this.getData();
  }

  ngAfterViewInit(): void {
    // this.customEvent();
    
  }

  public customEvent(): void {
      this.calendarOptions = {
        plugins: [dayGridPlugin,interactionPlugin], //interactionPlugin this plugin is use for active the calendar events
        events: [],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this),
        // customButtons: {
        //   btnBloquearAgenda: {
        //     icon: 'fa fa-lock',
        //     click: function () {
        //       alert('clicked the custom button!');
        //     }
        //   }
        // },
        editable: true,
        contentHeight: '1200px',
        selectable: true,
        selectMirror: true,
        eventTextColor :'black',
        firstDay:6,
        weekNumbers: true,
        // dayMaxEvents: true, //this is for show more button
        fixedWeekCount: false, //this is for show one week extra
        headerToolbar: false,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        // eventDrop: this.onEventDrop.bind(this),
        // eventResize: this.onEventResize.bind(this),
        // eventContent:(event)=>{
        //   console.log('event :>> ', event);
        // }
        // eventDidMount: (event)=>{
        //   this.upDateCalenderCss(event);
        // },
      };
    // $("#m_calendar").find(".fc-timegrid").find(".fc-daygrid-body tr td:first-child").remove();
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
      console.log('this.eventData :>> ', this.eventData);
      setTimeout(() => {
      this.calendar.getApi().addEventSource(this.eventData);
    }, 0);
    })
  }

  public removeAllEvents(){
    this.calendar.getApi().removeAllEvents();
  }

  upDateCalenderCss(event: any) {
    const eventData = event.event._def.extendedProps;
    const element = event.el;
    if (eventData.recurrence) {
      $(element)
        .find(".fc-event-title")
        .before(
          '<i class="fa fa-refresh" style="color:black; margin-top:5px;" aria-hidden="true"></i> '
        );
    }

    if (element.classList.contains("fc-daygrid-event")) {
      $(".fc-daygrid-event").data("content", eventData.description);
      $(".fc-daygrid-event").data("placement", "top");
      // mApp.initPopover(element);
    } else if (element.classList.contains("fc-time-grid-event")) {
      element
        .find(".fc-event-title")
        .append(
          '<div class="fc-description">' + eventData.description + "</div>"
        );
    } else if (element.find(".fc-list-item-title").length !== 0) {
      element
        .find(".fc-list-item-title")
        .append(
          '<div class="fc-description">' + eventData.description + "</div>"
        );
    }

    if (!event.is_holiday && eventData.description) {
      const dateAndTime = `${moment(
        `${eventData["from_date"]} ${eventData["start_time"]}`
      ).format("LLL")} - ${moment(
        `${eventData["to_date"]} ${eventData["end_time"]}`
      ).format("LLL")}`;
      const promoDescription = eventData.description
        ? `<div class="tooltip-promo-list"><i class="fa fa-file-text-o"></i><div>${eventData.description.replace(
            /'/g,
            ""
          )}</div></div>`
        : ``;
      const promoName = `<div class="tooltip-promo-name" style="background-color:${
        event.backgroundColor
      };">${eventData.name.replace(/'/g, "")}</div>`;
      $(element).find(".fc-event-title")
        .append(` <i class="fa fa-file-text-o tooltips" data-placement="bottom" 
          data-original-title='${promoName}<div class="tooltip-promo-list"><i class="fa fa-calendar-check-o"></i><p>${dateAndTime}</p></div>${promoDescription}</div>'></i>`);   
      //  show tooltip when company has more promos
      // $(element).find(".tooltips").tooltip({
      //   html: true,
      // }); 
    }
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
  handleDateSelect(selectInfo: any) {
    console.log('selectInfo :>> ', selectInfo);
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
    clickInfo.event.remove();
  }


  onShowDrawer(event: any) {
    this.showPromoModal = false;
  }

  getCalendar(){
    return this.calendar.getApi();
  }

  public getFormData(e: any): void {
    var id = this.eventData.length ? this.eventData.length + 1 : 1;
    const event = this.getCalendar().getEventById(this.currentEventId);
    if (event) event.remove();
    this.getCalendar().addEvent({
      id: id?.toString(),
      title: e.eventName,
      start: e.startDate,
      end: e.endDate,
      color: e.colorCode,
      description: e.descrption
    });


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
