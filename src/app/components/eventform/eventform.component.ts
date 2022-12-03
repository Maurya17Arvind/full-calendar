import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ClosePopupServiceService } from 'src/app/service/close-popup-service.service';

@Component({
  selector: 'app-eventform',
  templateUrl: './eventform.component.html',
  styleUrls: ['./eventform.component.scss']
})
export class EventformComponent implements OnInit {

  @Output() showDrawer: any = new EventEmitter<any>();
  @Output() formDate: any = new EventEmitter<any>();
  @Input() select: any;
  public teamFormData: any;
  public isDisableForm: boolean = false;
  public showPromoModal!: boolean;
  public popUpForm!: FormGroup;
  public defaultDateAndTime: any;
  public startDate!: any;

  constructor(private colsePopup: ClosePopupServiceService, private fb: FormBuilder) {
    this.popUpForm = this.fb.group({
      eventName: ['', [Validators.required]],
      colorCode: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      descrption: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {

    // if (this.select.data) {

    // }
    console.log('this.select :>> ', this.select);

    this.defaultDateAndTime = {
      startDate: new Date(this.select.startStr),
      startTime: this.select.start,
      endDate: new Date(this.select.endStr),
      endTime: this.select.end
    }

    this.popUpForm.patchValue({
      eventName: this.select?._def?.title ? this.select._def.title : '',
      colorCode: this.select?.backgroundColor,
      startDate: this.select.id ? moment(this.select._instance.range.start).format('YYYY-MM-DD') : moment(this.defaultDateAndTime.startDate).format('YYYY-MM-DD'),
      startTime: this.select.id ? moment(this.select._instance.range.start).format('h:mm A') : moment(this.defaultDateAndTime.startTime).format('h:mm a'),
      endDate: this.select.id ? moment(this.select._instance.range.end).format('YYYY-MM-DD') : moment(this.defaultDateAndTime.endDate).format('YYYY-MM-DD'),
      endTime: this.select.id ? moment(this.select._instance.range.end).format('h:mm A') : moment(this.defaultDateAndTime.endTime).format('h:mm a'),
      descrption: this.select?._def?.extendedProps.description ? this.select?._def?.extendedProps.description : ''
    });

  }

  public save(): void {
    this.teamFormData = this.popUpForm.value;
    this.formDate.emit(this.teamFormData)
    this.showDrawer.emit(false);
    // this.toster.success('Event successfully added.')
  }

  public getDate() {
    
  }

  public onCloseDrawer(): void {
    if (!this.isDisableForm) {
      this.showDrawer.emit(false);
      // this.colsePopup.disablePromo = false;
      // this.toster.error('Event not added.')
    }
  }

  get fControl() {
    return this.popUpForm.controls;
  }

}
