import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { FilePickerDirective } from './file-picker.directive';
import { SelectedFilesTableComponent } from './selected-files-table/selected-files-table.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
  ],
  declarations: [
    AppComponent,
    FilePickerDirective,
    SelectedFilesTableComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
