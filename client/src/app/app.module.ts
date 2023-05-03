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
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { FilePickerDirective } from './file-picker.directive';
import { SelectedFilesTableComponent } from './selected-files-table/selected-files-table.component';
import { StatsService } from './stats.service';
import { StatsDisplayComponent } from './stats-display/stats-display.component';
import { KeyValuePipe } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    MatCardModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
    HttpClientModule,
    KeyValuePipe
  ],
  declarations: [
    AppComponent,
    FilePickerDirective,
    SelectedFilesTableComponent,
    StatsDisplayComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
