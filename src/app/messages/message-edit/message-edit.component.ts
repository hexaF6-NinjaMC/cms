import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef!: ElementRef;
  @ViewChild('msgText') messageInputRef!: ElementRef;

  currentSender: string = 'Aaron Bechtel';
  msgId: number = 122;

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const subEl: HTMLInputElement = this.subjectInputRef
      .nativeElement as HTMLInputElement;
    const subject: string = subEl.value;
    const msgEl: HTMLInputElement = this.messageInputRef
      .nativeElement as HTMLInputElement;
    const message: string = msgEl.value;
    const newMessage: Message = new Message(
      this.msgId,
      subject,
      message,
      this.currentSender,
    );
    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    const subEl: HTMLInputElement = this.subjectInputRef
      .nativeElement as HTMLInputElement;
    const msgEl: HTMLInputElement = this.messageInputRef
      .nativeElement as HTMLInputElement;
    subEl.value = '';
    msgEl.value = '';
  }
}
