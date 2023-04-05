import { Component, OnInit } from '@angular/core';
import { Message, User } from '../message';
import { MessagesService } from '../services/messages.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  public messages: Message[] = [];
  public users: User[] = [];

  constructor(private messagesService: MessagesService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  addMessage(message: Message) {
    console.log('message', message);
    this.messages.push(message);
    this.users.push(message.user);
  }

  loadMessages() {
    this.messagesService
      .getMessages()
      .subscribe((messages) => this.messages = messages);
    this.usersService
    .getUsers()
    .subscribe((users) => this.users = users);
  }
}
