import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InstrumentService } from '../services/instrument.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent {
  toppings = new FormControl(); // Initialize FormControl
  toppingList: string[] = ['wan Cheng', 'Bret lee', 'xin ping', 'lee chen'];
  instrumentForm!: FormGroup;
  instrumentId! :string
  selectedInstrument: string = '';
  instrumentName: string = '';
  constructor(private instrumentService:InstrumentService ,private route: ActivatedRoute,){

  } 

  ngOnInit() {
    this.instrumentForm = new FormGroup({
      instrumentName: new FormControl('', [
        Validators.required, // Field should not be empty
        Validators.minLength(4) // Must have more than 3 characters
      ]),
      // contributorName: new FormControl('', Validators.required), 
      facilityName: new FormControl('', Validators.required),
      facilityFunding: new FormControl('', Validators.required)
    });
    this.instrumentId = this.route.snapshot.paramMap.get('id') || '';

    // Fetch and patch the form if an instrument ID is present
    if (this.instrumentId) {
      this.instrumentService.getInstrumentById(this.instrumentId).subscribe((instrument) => {
        if (instrument) {
          this.instrumentForm.patchValue({
            instrumentName: instrument.instrumentName,
            contributors: instrument.contributors,
            facilityName: instrument.facilityName,
            facilityFunding: instrument.facilityFunding,
          });
          this.toppings.setValue(instrument.contributors); // Set the contributors value in the multi-select
        }
      });
    }
    // this.instrumentName = this.route.snapshot.paramMap.get('name') || '';
    // if (this.instrumentName) {
    //   this.loadInstrumentDetails(this.instrumentName);
    // }
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.instrumentName = params.get('name') || '';
          return this.instrumentService.getInstrumentByName(this.instrumentName);
        })
      )
      .subscribe((instrument) => {
        if (instrument) {
          this.patchFormValues(instrument);
        }
      });
  }
  patchFormValues(instrument: any) {
    this.instrumentForm.patchValue({
      instrumentName: instrument.instrumentName,
      facilityName: instrument.facilityName,
      facilityFunding: instrument.facilityFunding,
    });
    this.toppings.setValue(instrument.contributors);
  }

  // get instrumentName() {
  //   return this.instrumentForm.get('instrumentName');
  // } // Example topping list
 
  onSubmit() {
    if (this.instrumentForm.valid) {
      const instrumentData = {
        instrumentName: this.instrumentForm.value.instrumentName,
        contributors: this.toppings.value,
        facilityName: this.instrumentForm.value.facilityName,
        facilityFunding: this.instrumentForm.value.facilityFunding
      };

      this.instrumentService.addInstrument(instrumentData);
      this.instrumentForm.reset();
      console.log('Submitted instrument:', instrumentData); // Debugging
    }
  }
  loadInstrumentDetails(instrumentName: string) {
    this.instrumentService.getInstrumentByName(instrumentName).subscribe((instrument) => {
      if (instrument) {
        this.instrumentForm.patchValue({
          instrumentName: instrument.instrumentName,
          facilityName: instrument.facilityName,
          facilityFunding: instrument.facilityFunding,
        });
        this.toppings.setValue(instrument.contributors); // Set the contributors value in the multi-select
      }
    });
  }
  
  

  
}
