import { Component, ViewChild } from '@angular/core';

import { FilePickerDirective } from './file-picker.directive';

@Component({
  selector: 'app-mine',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {


  @ViewChild('buttonPicker', { static: true })
  buttonPicker: FilePickerDirective;

  @ViewChild('dropZonePicker', { static: true })
  dropZonePicker: FilePickerDirective;

  _multiple = false;
  selectedFiles = [];

  _onFilesChanged(files: FileList) {
    this.selectedFiles = [];
    const fileArray = Array.from(files);
    for (const file of fileArray) {
    this.selectedFiles.push(file);
    }
  }

  _onReset() {
    this.selectedFiles = [];
  }

  _reset() {
    this.buttonPicker.reset();
    this.dropZonePicker.reset();
  }
}
