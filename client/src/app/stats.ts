/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
export interface Stats {
  stats: {
    "minecraft:mined": {
      [key: string]: number;
    };
    "minecraft:broken": {
      [key: string]: number;
    };
    "minecraft:custom": {
      [key: string]: number;
    };
    "minecraft:dropped": {
      [key: string]: number;
    };
    "minecraft:used": {
      [key: string]: number;
    };
    "minecraft:crafted": {
      [key: string]: number;
    };
    "minecraft:killed_by": {
      [key: string]: number;
    };
    "minecraft:picked_up": {
      [key: string]: number;
    };
    "minecraft:killed": {
      [key: string]: number;
    };
  };
  DataVersion: number;
};
