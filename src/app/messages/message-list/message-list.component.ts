import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, 'First message', 'The first message.', 'Sender One'),
    new Message(2, 'Second message', 'The second message.', 'Sender Two'),
    new Message(3, 'Third message', 'The third message.', 'Sender Three'),
    new Message(4, 'Fourth message', 'The fourth message.', 'Sender Four'),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
