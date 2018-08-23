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
  private messagesSubscription: Subscription;

  messages: Message[];

  constructor(private readonly messageService: MessageService) {
  }

  ngOnInit() {
    this.getMessages();

    this.messagesSubscription = this.messageService.getMessages()
      .subscribe(message => {
        const messages = [].concat.apply([], message);

        // Max 1000 messages in chat
        if (this.messages.length >= 1000) {
          this.messages.shift();
        }

        this.setMessages(messages);
        setTimeout(() => this.scrollBottom(), 100);
        this.scrollBottom();
      });

    setTimeout(() => this.scrollBottom(), 100);
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
  }

  private setMessages(messages: any[]) {
    this.messages = this.messages.concat(messages);
    localStorage.setItem("messages", JSON.stringify(this.messages));
  }

  private getMessages() {
    const messages = localStorage.getItem("messages");

    if (messages) {
      this.messages = JSON.parse(messages);
    } else {
      this.messages = [];
    }
  }

  private scrollBottom() {
    if (this.chatContainer) {
      const chat = this.chatContainer.nativeElement;
      if (chat.lastElementChild) {
        chat.lastElementChild.scrollIntoView();
      }
    }
  }

}
