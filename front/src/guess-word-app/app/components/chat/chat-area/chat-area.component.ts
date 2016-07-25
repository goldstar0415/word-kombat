import { Component } from 'angular2/core';

const basePath = 'guess-word-app/app/components/chat/chat-area/'

@Component({
  selector: 'chat-area',
  templateUrl: basePath + 'chat-area.html',
  styleUrls: [basePath + 'chat-area.css']
})
export class ChatAreaComponent {

  // Mock data
  messages = [
      {
        user: {
        name: 'Guest1',
        icon: 'images/users/noIco.png',
      },
      value: "some random message",
      points: 10
    },

    {
        user: {
        name: 'Guest2',
        icon: 'images/users/noIco.png',
      },
      value: "another random message",
      points: 20
    },

    {
        user: {
        name: 'Guest',
        icon: 'images/users/noIco.png',
      },
      value: "some random message",
      points: 20
    },

    {
        user: {
        name: 'Guest',
        icon: 'images/users/noIco.png',
      },
      value: "some random message",
      points: 20
    },

     {
        user: {
        name: 'Guest',
        icon: 'images/users/noIco.png',
      },
      value: "some random message",
      points: 20
    },
    
  ]

}