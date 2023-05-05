import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StatsService } from '../stats.service';


@Component({
  selector: 'app-stats-display',
  templateUrl: './stats-display.component.html',
  styleUrls: ['./stats-display.component.scss']
})
export class StatsDisplayComponent implements OnInit, OnDestroy{

  public servedStats: JSON[];
  public combinedStats: any;
  private ngUnsubscribe = new Subject<void>();

  constructor(private statsService: StatsService) { }

  getStatsFromServer(): void {
    this.statsService.getAllStats().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (stats) => {
        this.servedStats = stats;
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
    console.log(this.servedStats);
    this.combinedStats = this.combineStats(this.servedStats);
}

ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}

  combineStats(worldStats: JSON[]) {
    const db = {};

    worldStats.forEach(file => {
      const stringJSON = JSON.stringify(file);
      const stats = JSON.parse(stringJSON).stats;

      Object.keys(stats).forEach(col => {
        // creates minecraft:custom, minecraft:mined
        if (db[col] === undefined) {
          db[col] = {};
        }

        // for each col, grab the key&value and add to our db
        for (const [key, value] of Object.entries(stats[col])) {
          // if the key isn't in our database, ex. minecraft:play_time isn't in our db
          if (db[col][key] === undefined) {
            db[col][key] = 0;
          }
          db[col][key] += value;
        }
      });
    });
    return db;
  }
}
