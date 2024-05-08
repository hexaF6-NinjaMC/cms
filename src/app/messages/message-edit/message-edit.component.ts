import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef!: ElementRef;
  @ViewChild('msgText') messageInputRef!: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = 'Aaron Bechtel';
  msgId: number = 122;

  onSendMessage() {
    const subEl: HTMLInputElement = this.subjectInputRef
      .nativeElement as HTMLInputElement;
    const subject: string = subEl.value;
    const msgEl: HTMLInputElement = this.subjectInputRef
      .nativeElement as HTMLInputElement;
    const message: string = msgEl.value;
    const newMessage: Message = new Message(
      this.msgId,
      subject,
      message,
      this.currentSender,
    );
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    const subEl: HTMLInputElement = this.subjectInputRef
      .nativeElement as HTMLInputElement;
    const msgEl: HTMLInputElement = this.subjectInputRef
      .nativeElement as HTMLInputElement;
    subEl.value = '';
    msgEl.value = '';
  }
}
