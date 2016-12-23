import { Injectable } from '@angular/core';

@Injectable()
export class MatchesService {
  getMatches(): Array<any> {
    return [
      {
        id: 1,
        startTime: new Date(2016, 7, 20, 12, 20, 21).toISOString().slice(2, 16).replace(/\T/gi, " "),
        endTime: new Date(2016, 7, 20, 12, 23, 41).toISOString().slice(2, 16).replace(/\T/gi, " "),
        position: 1,
        totalUsers: 8,
        totalWords: 4,
        totalScore: 21
      },
      {
        id: 2,
        startTime: new Date(2016, 7, 20, 12, 20, 21).toISOString().slice(2, 16).replace(/\T/gi, " "),
        endTime: new Date(2016, 7, 20, 12, 23, 41).toISOString().slice(2, 16).replace(/\T/gi, " "),
        position: 1,
        totalUsers: 8,
        totalWords: 4,
        totalScore: 21
      },
      {
        id: 3,
        startTime: new Date(2016, 7, 20, 12, 20, 21).toISOString().slice(2, 16).replace(/\T/gi, " "),
        endTime: new Date(2016, 7, 20, 12, 23, 41).toISOString().slice(2, 16).replace(/\T/gi, " "),
        position: 1,
        totalUsers: 8,
        totalWords: 4,
        totalScore: 21
      },
      {
        id: 4,
        startTime: new Date(2016, 7, 20, 12, 20, 21).toISOString().slice(2, 16).replace(/\T/gi, " "),
        endTime: new Date(2016, 7, 20, 12, 23, 41).toISOString().slice(2, 16).replace(/\T/gi, " "),
        position: 1,
        totalUsers: 8,
        totalWords: 4,
        totalScore: 21
      },
      {
        id: 5,
        startTime: new Date(2016, 7, 20, 12, 20, 21).toISOString().slice(2, 16).replace(/\T/gi, " "),
        endTime: new Date(2016, 7, 20, 12, 23, 41).toISOString().slice(2, 16).replace(/\T/gi, " "),
        position: 1,
        totalUsers: 8,
        totalWords: 4,
        totalScore: 21
      }
    ];
  }
}