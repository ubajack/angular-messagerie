import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  public messages: Message[] = [];

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messagesService
      .getMessages()
      .subscribe((messages) => (this.messages = messages));
  }
}
