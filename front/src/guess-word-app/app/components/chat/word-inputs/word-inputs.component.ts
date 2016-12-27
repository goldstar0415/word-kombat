import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { MessagingService } from '../../../services/messaging.service';

import { Message } from '../../../models/message.model';
import { User } from '../../../models/user.model';

declare let __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'word-inputs',
  templateUrl: 'word-inputs.html',
  styleUrls: ['word-inputs.css'],
  providers: [MessagingService, UsersService]
})
export class WordInputsComponent implements OnInit {

  @Input() private word: string;
  @Output() private wordEntered = new EventEmitter<string>();

  private message: Message;

  constructor(
    private messagingService: MessagingService,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    let id = this.authService.getUserId();

    if(!!id) {
      this.usersService.getById(this.authService.getUserId())
        .subscribe(user => {
          this.message = new Message(null, user, null);
        }, error => {
          console.error(error);
        });
    } else {
      this.message = new Message(null, new User(), null);
    }
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
      this.messagingService.sendMessage(this.message);
    }
  }

}