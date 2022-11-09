import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

interface SpeedInterface {
  name: string;
  checked: boolean;
}
interface IPInterface {
  name: string;
  checked: boolean;
}
interface DevicesInterface {
  name: string;
  checked: boolean;
}
const RADIO_LIST_FROM_DATABASE = [
  { name: 'Camera', checked: false },
  { name: 'Doorbell', checked: false },
  { name: 'ALarm', checked: true },
];
const RADIO_LIST1_FROM_DATABASE = [
  { name: '100', checked: false },
  { name: '1 gig', checked: false },
  { name: '10 gig', checked: true },
];
const RADIO_LIST2_FROM_DATABASE = [
  { name: '130', checked: false },
  { name: '124', checked: false },
  { name: '128', checked: true },
];
const RADIO_LIST3_FROM_DATABASE = [
  { name: 'Camera', checked: false },
  { name: 'Doorbell', checked: false },
  { name: 'Alarm', checked: true },
];
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name: string = 'Angular';
  speed: SpeedInterface[];
  staticip: IPInterface[];
  devices: DevicesInterface[];
  form: FormGroup;
  result: {
    selectedSpeed: SpeedInterface[];
    selectedIp: IPInterface[];
    selectedDevice: DevicesInterface[];
    internet: string;
    ip: string;
    managedinstall: string;
    ltebackup: string;
    security: string;
  } = {
    selectedSpeed: [],
    selectedIp: [],
    selectedDevice: [],
    internet: '',
    ip: '',
    managedinstall: '',
    ltebackup: '',
    security: '',
  };

  ngOnInit(): void {
    // bind props with data from database

    this.speed = RADIO_LIST1_FROM_DATABASE;
    this.staticip = RADIO_LIST2_FROM_DATABASE;
    this.devices = RADIO_LIST3_FROM_DATABASE;
    // build reactive form skeleton
    this.form = new FormGroup({
      // control for radio exemple
      internet: new FormControl(null, Validators.required),
      ip: new FormControl(null, Validators.required),
      managedinstall: new FormControl(null, Validators.required),
      ltebackup: new FormControl(null, Validators.required),
      security: new FormControl(null, Validators.required),
      // control for Checkbox exemple
      fruits: new FormArray([]),
      speed: new FormArray([]),
      staticip: new FormArray([]),
      devices: new FormArray([]),
    });
    // bind existing value to form control
    this._patchValues();
  }

  private _patchValues(): void {
    // get array control

    const formArray1 = this.form.get('speed') as FormArray;
    // loop for each existing value
    this.speed.forEach((speed) => {
      // add new control to FormArray
      formArray1.push(
        // here the new FormControl with item value from RADIO_LIST_FROM_DATABASE
        new FormGroup({
          name: new FormControl(speed.name),
          checked: new FormControl(speed.checked),
        })
      );
    });
    const formArray2 = this.form.get('staticip') as FormArray;
    // loop for each existing value
    this.staticip.forEach((staticip) => {
      // add new control to FormArray
      formArray2.push(
        // here the new FormControl with item value from RADIO_LIST_FROM_DATABASE
        new FormGroup({
          name: new FormControl(staticip.name),
          checked: new FormControl(staticip.checked),
        })
      );
    });
    const formArray3 = this.form.get('devices') as FormArray;
    // loop for each existing value
    this.devices.forEach((devices) => {
      // add new control to FormArray
      formArray3.push(
        // here the new FormControl with item value from RADIO_LIST_FROM_DATABASE
        new FormGroup({
          name: new FormControl(devices.name),
          checked: new FormControl(devices.checked),
        })
      );
    });
  }

  submitForm(): void {
    const { value } = this.form;
    // get selected fruit from FormGroup value
    const selectedSpeed =
      value?.speed?.filter((f: SpeedInterface) => f.checked) || [];
    const selectedIp =
      value?.staticip?.filter((f: IPInterface) => f.checked) || [];
    const selectedDevice =
      value?.devices?.filter((f: DevicesInterface) => f.checked) || [];
    // form value binded
    console.log('current form value: ', value);
    // console.log('only selected form value: ', selectedFruit);
    // original value from database not change
    this.result = {
      internet: value?.internet || '',
      selectedSpeed,
      ip: value?.ip || '',
      selectedIp,
      managedinstall: value?.managedinstall || '',
      ltebackup: value?.ltebackup || '',
      security: value?.security || '',
      selectedDevice,
    };
  }
}
