export class User {
  id?: number;
  pseudo: string;

  constructor(pseudo: string = '', id?: number) {
    this.id = id;
    this.pseudo = pseudo;
  }
}

export class Message {
  id?: number;
  user: User;
  message: string;
  date: Date;

  constructor(user: User, message: string = '', id?: number) {
    this.id = id;
    this.user = user;
    this.message = message;
    this.date = new Date();
  }
}
