import { Component, OnDestroy, OnInit } from '@angular/core';
import { Stats } from '../stats';
import { Subject, takeUntil } from 'rxjs';
import { StatsService } from '../stats.service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-stats-display',
  templateUrl: './stats-display.component.html',
  styleUrls: ['./stats-display.component.scss']
})
export class StatsDisplayComponent implements OnInit, OnDestroy{

  public servedStats: Stats[];
  private ngUnsubscribe = new Subject<void>();

  constructor(private statsService: StatsService) { }

  getStatsFromServer(): void {
    this.statsService.getAllStats().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (stats) => {
        this.servedStats = stats;
        console.log(this.servedStats);
        console.log(this.servedStats);

      },

      error: (err) => {
        let message = '';
        if (err.error instanceof ErrorEvent) {
          message = `Problem in the client – Error: {err.error.message}`;
        } else {
          message = `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`;
        }
      },
    });
  }

  ngOnInit(): void {
    this.getStatsFromServer();
}

ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}
}
