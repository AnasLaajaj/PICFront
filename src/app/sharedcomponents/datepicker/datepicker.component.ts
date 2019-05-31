import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  startValue: Date = null;
  endValue: Date = null;
  endOpen: boolean = false;
  subscription: Subscription;
  constructor(private communicationService: CommunicationService) {
    this.subscription = this.communicationService.getOpenStatus().subscribe(op => {
      if (op) {
        this.endOpen=op;
      } else {
        // clear messages when empty message received
        this.endOpen = false;
      }
    });
   }

  
  
  ngOnInit() {
  }

  sendDates(): void {
    this.communicationService.sendEndValue(this.endValue);
    this.communicationService.sendStartValue(this.startValue);
  }
  clearDates(): void{
    this.communicationService.clearMessages();
  }
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
   }

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  }

  onStartChange(date: Date): void {
    this.startValue = date;
    this.communicationService.sendStartValue(date);
  }

  onEndChange(date: Date): void {
    this.endValue = date;
    this.communicationService.sendEndValue(date);

  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
    console.log('handleStartOpenChange', open, this.endOpen);
  }

  handleEndOpenChange(open: boolean): void {
    console.log(open);
    this.endOpen = open;
  }
}
