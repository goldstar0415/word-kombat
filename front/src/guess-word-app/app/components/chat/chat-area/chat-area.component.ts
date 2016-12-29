import { 
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';

import { MessagingService } from '../../../services/messaging.service';

import { Message } from '../../../models/message.model';
import { User } from '../../../models/user.model';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'chat-area',
  templateUrl: 'chat-area.html',
  styleUrls: ['chat-area.css'],
  providers: [MessagingService]
})
export class ChatAreaComponent implements OnInit, OnDestroy {

  @ViewChild('chat') private chatContainer: ElementRef;

  private messages: Message[];
  private message: Message;
  private connection;

  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    this.messages = [];
    
    this.connection = this.messagingService.getMessages().subscribe(message => {
      // Max 500 messages in chat
      if(this.messages.length >= 500) {
        this.messages.shift();
      }
      this.messages.push(message);
      this.scrollBottom();
    });

    this.scrollBottom();
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  private scrollBottom() {
   try {
      let chat;
      if(this.chatContainer) {
        chat = this.chatContainer.nativeElement;
        chat.scrollTop = chat.scrollHeight;
      }
    } catch(err) {
      console.error(err);
    }
  }

}