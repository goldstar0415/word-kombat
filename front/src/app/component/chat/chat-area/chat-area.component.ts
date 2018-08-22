import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { Subscription } from "rxjs/Rx";

import { Message } from "../../../model/message.model";
import { MessageService } from "../../../service/message/message.service";

@Component({
  selector: "wk-chat-area",
  templateUrl: "./chat-area.component.html",
  styleUrls: ["./chat-area.component.scss"]
})
export class ChatAreaComponent implements OnInit, OnDestroy {

  @ViewChild("chat") private chatContainer: ElementRef;

  messages: Array<Message>;
  private messagesSubscription: Subscription;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messages = [];

    this.messagesSubscription = this.messageService.getMessages()
      .subscribe(message => {
        // Max 1000 messages in chat
        if (this.messages.length >= 1000) {
          this.messages.shift();
        }
        this.messages.push(message);
        this.scrollBottom();
      });

    this.scrollBottom();
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
  }

  private scrollBottom() {
    if (this.chatContainer) {
      const chat = this.chatContainer.nativeElement;
      if (chat.lastElementChild) {
        setTimeout(() => {
          chat.lastElementChild.scrollIntoView();
        }, 10);
      }
    }
  }

}
