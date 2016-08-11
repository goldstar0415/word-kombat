import { Component, Input, Output, EventEmitter, OnInit } from 'angular2/core';

import { MessagingService } from '../../../services/messaging.service';

import { Message } from '../../../models/message.model';
import { User } from '../../../models/user.model';

const basePath = 'guess-word-app/app/components/chat/word-inputs/';

@Component({
  selector: 'word-inputs',
  templateUrl: basePath + 'word-inputs.html',
  styleUrls: [basePath + 'word-inputs.css'],
  providers: [MessagingService]
})
export class WordInputsComponent implements OnInit {

  @Input() private word: string;

  @Input() private socket: any;

  @Output() private wordEntered = new EventEmitter<string>();

  private message: Message;
  private messagingService: MessagingService;

  ngOnInit() {
    this.messagingService.init(this.socket);
  }

  constructor(messagingService: MessagingService) {
    this.message = new Message(null,
      new User(1, null, "guest", 0, "images/users/noIco.png", 1), null);

    this.messagingService = messagingService;
  }

  enterLetter(word: string) {
    this.word = word;
    this.wordEntered.emit(this.word);
  }

  deleteLastLetter() {
    const len = this.word.length;

    if(len === 1) {
      this.word = "";
    } else if(len > 1) {
      this.word = this.word.substring(0, len - 1);
    }

    this.wordEntered.emit(this.word);
  }

  sendMessage() {
    this.message.text = this.word;

    this.word = "";
    this.wordEntered.emit(this.word);

    if(this.message.text !== null && this.message.text !== '') {
      this.messagingService.sendMessage(this.message.values);
    }
  }

}