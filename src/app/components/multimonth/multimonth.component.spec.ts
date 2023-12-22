import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimonthComponent } from './multimonth.component';

describe('MultimonthComponent', () => {
  let component: MultimonthComponent;
  let fixture: ComponentFixture<MultimonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultimonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultimonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
