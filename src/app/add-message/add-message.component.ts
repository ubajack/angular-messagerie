import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message, User } from '../message';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css'],
})
export class AddMessageComponent {
  messageForm: FormGroup;

  constructor(private messageService: MessagesService) {
    this.messageForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.warn(this.messageForm.value);

    this.messageService
      .addMessage(
        new Message(
          new User(this.messageForm.value.user),
          this.messageForm.value.message
        )
      )
      .subscribe((message) => console.log('message', message));
  }
}
