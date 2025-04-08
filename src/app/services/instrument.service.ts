import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  private instruments: any[] = [];
  private instrumentsSource = new BehaviorSubject<any[]>([]);
  instruments$ = this.instrumentsSource.asObservable();
  private instrumentsSubject = new BehaviorSubject<any[]>([]);

  // Add new instrument to the list
  addInstrument(instrument: any) {
    this.instruments.push(instrument);
    const currentInstruments = this.instrumentsSource.getValue();
    this.instrumentsSource.next([...currentInstruments, instrument]);
    this.instrumentsSubject.next(this.instruments);
  }

  // Get all instruments
  getInstruments():Observable<any[]> {
    return this.instrumentsSubject.asObservable();
  }
  getInstrumentById(id: string): Observable<any> {
    const instrument = this.instruments.find(inst => inst.id === id);
    return new BehaviorSubject(instrument).asObservable();
  }
  getInstrumentByName(name: string): Observable<any> {
    const instrument = this.instruments.find(inst => inst.instrumentName === name);
    return new BehaviorSubject(instrument).asObservable();
  }
  

  constructor() { }
}
