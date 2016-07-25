import { Component } from 'angular2/core';

import { WordCardComponent } from './word-card/word-card.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';
import { UserListComponent } from './user-list/user-list.component';
import { WordLettersComponent } from './word-letters/word-letters.component';
import { WordInputsComponent } from './word-inputs/word-inputs.component';

const basePath = 'guess-word-app/app/components/chat/';

@Component({
  selector: 'chat',
  templateUrl: basePath + 'chat.html',
  styleUrls: [basePath + 'chat.css'],
  directives: [
    WordCardComponent,
    ChatAreaComponent,
    UserListComponent,
    WordLettersComponent,
    WordInputsComponent
  ]
})
export class ChatComponent {

}