import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeviewComponent } from './timeview.component';

describe('TimeviewComponent', () => {
  let component: TimeviewComponent;
  let fixture: ComponentFixture<TimeviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
