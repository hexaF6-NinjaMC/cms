/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectInputRef!: ElementRef;
  @ViewChild('msgText') messageInputRef!: ElementRef;
  @ViewChild('message') messageSpanRef!: ElementRef;

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  onSendMessage() {
    const subEl: HTMLInputElement = this.subjectInputRef
      .nativeElement as HTMLInputElement;
    const subject: string = subEl.value;
    const msgEl: HTMLInputElement = this.messageInputRef
      .nativeElement as HTMLInputElement;
    const message: string = msgEl.value;
    const newMessage: Message = new Message(
      subject,
      message,
      '935f28ed-10d1-4d36-98e2-dbadfb062e79',
    );
    console.log(newMessage);
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    const subEl: HTMLInputElement = this.subjectInputRef
      .nativeElement as HTMLInputElement;
    const msgEl: HTMLInputElement = this.messageInputRef
      .nativeElement as HTMLInputElement;
    const msgRemainingCharsElement: HTMLElement = this.messageSpanRef
      .nativeElement as HTMLSpanElement;
    subEl.value = '';
    msgEl.value = '';
    msgRemainingCharsElement.textContent = '255';
    msgRemainingCharsElement.style.color = 'green'; // Reset to good-to-go fields!
  }

  onKeyUp() {
    const msgTextBox = document.querySelector(
      '#message',
    ) as HTMLTextAreaElement;
    const msgTextCharNotif = document.querySelector(
      '#remaining',
    ) as HTMLElement;
    const maxLength = 255;
    msgTextCharNotif.style.color = 'green';
    const remaining = maxLength - msgTextBox.value.length;
    msgTextCharNotif.textContent = `${remaining}`;
    if (remaining <= 0) {
      msgTextCharNotif.style.color = 'darkred'; // Maxed out in text content.
    } else if (remaining > 0 && remaining <= 100) {
      msgTextCharNotif.style.color = 'crimson'; // First-degree of 'red', denotes approaching end of limit.
    } else if (remaining > 100 && remaining <= 175) {
      msgTextCharNotif.style.color = '#B8860B'; // yellow-orangeish color in dark mode.
    } else {
      msgTextCharNotif.style.color = 'green'; // Obviously, it's black. (/s, it's green! XD)
    }
    if (msgTextBox.value.length > maxLength) {
      msgTextBox.value = msgTextBox.value.slice(0, maxLength);
    }
  }
}
