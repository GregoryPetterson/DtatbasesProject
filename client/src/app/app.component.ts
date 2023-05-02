/* eslint-disable no-underscore-dangle */
import { Component, ViewChild } from '@angular/core';

import { FilePickerDirective } from './file-picker.directive';

@Component({
  selector: 'app-stats',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {


  @ViewChild('buttonPicker', { static: true })
  buttonPicker: FilePickerDirective;

  _selectedFiles = [];

  _onFilesChanged(files: FileList) {
    this._selectedFiles = [];
    const fileArray = Array.from(files);
    for (const file of fileArray) {
    this._selectedFiles.push(file);
    }
    this.onSubmit();

  }


  _onReset() {
    this._selectedFiles = [];
  }

  _reset() {
    this.buttonPicker.reset();
  }

  private onSubmit(): void {
    // Here you can add the logic to submit the selected files.
    // For example, you can send them to an API endpoint using the HttpClient.
  }
}
