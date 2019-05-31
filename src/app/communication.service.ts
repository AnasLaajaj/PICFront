import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private startValue = new Subject<any>();
  private endValue = new Subject<any>();
  private opened = new Subject<any>();


    sendStartValue(message: Date) {
        this.startValue.next(message);
    }
    sendEndValue(message: Date) {
      this.endValue.next(message);
  }
  sendOpenStatus(open:boolean){
    this.opened.next(open);
  }
    clearMessages() {
        this.startValue.next();
        this.endValue.next();

    }

    getStartValue(): Observable<any> {
        return this.startValue.asObservable();
}
getEndValue(): Observable<any> {
  return this.endValue.asObservable();
}
getOpenStatus(): Observable<any>{
  return this.opened.asObservable();
}
}