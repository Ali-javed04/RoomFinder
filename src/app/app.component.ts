import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';
import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';

import * as moment from 'moment';
import { Subject } from 'rxjs';
import { Room } from './room';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  selectedMonthViewDay: CalendarMonthViewDay | undefined;

  selectedDayViewDate: Date | undefined;

  hourColumns: WeekViewHourColumn[]=[];

  events: CalendarEvent[] = [];

  selectedDays: any = [];
  currentdate = new Date()
  abc:Date | undefined
  reservations: any = [];
  room: Room[] =[]
  totalroom: number = 0;
  refresh: Subject<any> = new Subject();
  constructor(private databaseService: DatabaseService) { }
  ngOnInit(): void {

   this.dayClicked()
  }
  dayClicked(): void {

  }



  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    this.databaseService.getAllRooms().subscribe((response)=>{
      this.room = response
      this.room.map((x:Room)=>{
        this.totalroom   = this.totalroom + x.seats
      })
      console.log('this.totalroom',this.totalroom)
      this.databaseService.getAllReservation().subscribe((response)=>{
        this.reservations = response

        body.forEach((day:any) => {
          this.dayClicked()
         let a =  this.checkDate(day.date)

          if(a ==='blue') {
            day.cssClass = 'cal-day-selected';
          }
          else if(a==='yellow') {
            day.cssClass = 'cal-blue-selected';
          }
          else if(a ==='red') {
            day.cssClass = 'cal-red-selected';
          }
          else {
            day.cssClass = 'cal-day-selected';
          }


        });
        this.refresh.next();

      },(error)=>{
        console.log(error)
      })


    },(error)=>{
      console.log(error)
    })


  }

  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }

  beforeWeekOrDayViewRender(event: CalendarWeekViewBeforeRenderEvent) {
    this.hourColumns = event.hourColumns;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    this.hourColumns.forEach((column) => {
      column.hours.forEach((hourSegment) => {
        hourSegment.segments.forEach((segment) => {
          delete segment.cssClass;
          if (
            this.selectedDayViewDate &&
            segment.date.getTime() === this.selectedDayViewDate.getTime()
          ) {
            segment.cssClass = 'cal-day-selected';
          }
        });
      });
    });
  }

  GetAllReservation() {
    this.databaseService.getAllReservation().subscribe((response)=>{
      this.reservations = response
    },(error)=>{
      console.log(error)
    })

  }

  totalSeatsoftheDay() {
    this.databaseService.getAllRooms().subscribe((response)=>{
      this.room = response
      this.room.map((x:any)=>{
        this.totalroom += x.seats
      })

    },(error)=>{
      console.log(error)
    })
  }
  checkDate(date:Date):string {
   let a =  moment(date).format("YYYY-MM-DD");
   let array1 = this.reservations.filter((x:any)=>x.date == a)
   let specifcdaylength = array1.length
   console.log('specific day',array1.length)
   console.log('totalroom',this.totalroom)
   let halftotal = this.totalroom/2
   if(specifcdaylength <  halftotal) {
     return 'blue'

   }
   else if(specifcdaylength >  halftotal && specifcdaylength < this.totalroom ) {
    return 'yellow'

  }
  else if(specifcdaylength == this.totalroom){
    return 'red'

  }
  else {
    return 'blue'
  }
  }

}
