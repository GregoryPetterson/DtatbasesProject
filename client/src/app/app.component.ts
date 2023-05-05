import { Component, ViewChild } from '@angular/core';
import { FilePickerDirective } from './file-picker.directive';
import { StatsService } from './stats.service';


@Component({
  selector: 'app-stats',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('filePicker', { static: true })
  filePicker: FilePickerDirective;

  selectedFiles: File[] = [];

  constructor( private fileUploader: StatsService) {}

  onFilesChanged(files: FileList) {
    this.selectedFiles = Array.from(files);
    this.onSubmit();
  }

  onReset() {
    this.selectedFiles = [];
  }

  resetPicker() {
    this.filePicker.reset();
  }

  onSubmit(): void {
    this.selectedFiles.forEach((file: File) => {
      this.fileUploader.uploadFile(file)
      .subscribe(response => console.log('Upload response:', response));
    });

  }


}
