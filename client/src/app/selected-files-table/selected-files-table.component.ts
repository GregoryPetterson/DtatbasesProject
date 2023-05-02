import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selected-files-table',
  templateUrl: './selected-files-table.component.html',
})
export class SelectedFilesTableComponent {
  @Input()
  files: File[] = [];

  _displayedColumns = ['name', 'type', 'size', 'lastModified'];



  constructor() { }


}
