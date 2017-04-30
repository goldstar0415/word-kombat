import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { AuthService } from '../../../service/auth/auth.service';
import { UserService } from '../../../service/user/user.service';
import { MessageService } from '../../../service/message/message.service';

import { Message } from '../../../model/message.model';
import { User } from '../../../model/user.model';

@Component({
  selector: 'wk-word-inputs',
  templateUrl: 'word-inputs.component.html',
  styleUrls: ['word-inputs.component.scss']
})
export class WordInputsComponent implements OnInit {

  @Input() word: string;
  @Output() private wordEntered = new EventEmitter<string>();

  private message: Message;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    let id = this.authService.getUserId();

    if(id) {
      this.userService.getById(id)
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
      this.messageService.sendMessage(this.message);
    }
  }

}