import { 
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from 'angular2/core';

import { MessagingService } from '../../../services/messaging.service';

import { Message } from '../../../models/message.model';
import { User } from '../../../models/user.model';

const basePath = 'guess-word-app/app/components/chat/chat-area/'

@Component({
  selector: 'chat-area',
  templateUrl: basePath + 'chat-area.html',
  styleUrls: [basePath + 'chat-area.css'],
  providers: [MessagingService]
})
export class ChatAreaComponent implements OnInit, OnDestroy {

  @Input() private socket: any;

  @ViewChild('chat') private chatContainer: ElementRef;

  private messages: Message[];
  private message: Message;
  private connection;

  private messagingService: MessagingService;

  constructor(messagingService: MessagingService) {
    this.messagingService = messagingService;
  }

  ngOnInit() {
    this.messages = [];
    
    console.log(this.socket);
    
    this.messagingService.init(this.socket);
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
     const chat = this.chatContainer.nativeElement;
     chat.scrollTop = chat.scrollHeight;
   } catch(err) {
     console.error(err);
   }
 }

}