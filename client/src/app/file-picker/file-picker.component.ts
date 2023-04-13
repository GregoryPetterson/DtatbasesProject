import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.css']
})
export class SelectedFilesTableComponent {
  _displayedColumns = ['name', 'type', 'size', 'lastModified'];

  @Input()
  files: File[] = [];

  constructor() { }


}
