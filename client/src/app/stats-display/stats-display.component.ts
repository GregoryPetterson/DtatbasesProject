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
        this.combinedStats = this.combineStats(this.servedStats);
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

  combineStats(worldStats: JSON[]) {
    const db = {};

    worldStats.forEach(file => {
      // Turn into string and regex out "minecraft:" prefix
      // so it just displays "cooked_porkchop" instead of "minecraft:cooked_porkchop".
      const stringJSON = JSON.stringify(file).replace(/minecraft:/g, '');
      const stats = JSON.parse(stringJSON).stats;

      Object.keys(stats).forEach(col => {
        // creates statistic categories. E.g. custom, mined, crafted... etc.
        if (db[col] === undefined) {
          db[col] = {};
        }

        // For each col in the JSON, grab the key&value and add to our db
        for (const [key, value] of Object.entries(stats[col])) {
          // if the key isn't in our database, e.g. damage_dealt isn't in our db
          if (db[col][key] === undefined) { // Checks if the key exists in the db object under the current property.
            db[col][key] = 0; // Creates a new value of zerof if the key doesn't exist.
          }
          db[col][key] += value; // Adds the value of the current key to the value in the db object.
        }
      });
    });
    return db;
  }
}
