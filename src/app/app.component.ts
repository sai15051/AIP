import { Component, Input, ViewChild } from '@angular/core';
import { InstrumentsComponent } from './instruments/instruments.component';
import { InstrumentService } from './services/instrument.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-project';
  instruments: any[] = [];
  isSidenavOpen = false;
  instrumentList: string[] = [];
  subMenuOpen: { [key: string]: boolean } = {
    instruments: false,
    material: false,
    techniques: false
  };
  @ViewChild(InstrumentsComponent) instrumentFormComponent!: InstrumentsComponent;

  constructor(private instrumentService:InstrumentService) {}
  ngOnInit() {
    this.instrumentService.getInstruments().subscribe((instruments) => {
      this.instruments = instruments;
    });
  }

  // Toggle sidenav open/close state
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  // Toggle sub-menu open/close state
  toggleSubMenu(menu: string) {
    this.subMenuOpen[menu] = !this.subMenuOpen[menu];
  }
  onInstrumentAdded(instrumentName: string): void {
    // Add the instrument to the list
    this.instrumentList.push(instrumentName);
  }

  

  
}
