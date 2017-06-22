import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { SocketService } from '../socket/socket.service';
import { Score } from '../../model/score.model';

@Injectable()
export class MatchService {

  private socket: SocketIOClient.Socket;
  private winners: Array<Score>;
  private scores: Array<Score>;

  constructor(private socketService: SocketService) {
    this.winners = [new Score()];
    this.setSocket();
  }

  setSocket(socket?: SocketIOClient.Socket) {
    if(socket) {
      this.socket = socket;
    } else {
      this.socket = this.socketService.socket;
    }
  }

  isMatchOver(): Observable<Array<Score>> {
    let observable = new Observable(observer => {
      this.socket.on('end-of-match', res => {
        this.winners = res;
        observer.next(res);
      });
    });
    return observable;
  }

  getScores(): Observable<Array<Score>> {
    let observable = new Observable(observer => {
      this.socket.on('scores', scores => {
        this.scores = scores.sort((score1, score2) => {
          return score2.score - score1.score;
        });
        observer.next(this.scores);
      });
    });
    return observable;
  }

  getAllScores(): Array<Score> {
    return this.scores;
  }

  getWinners(): Array<Score> {
    return this.winners;
  }

}
