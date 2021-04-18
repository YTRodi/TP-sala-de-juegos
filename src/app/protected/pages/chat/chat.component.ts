import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  message: string;
  element: any;

  constructor(
    public chatService: ChatService,
    private notification: NotificationService
  ) {
    this.message = '';
    this.chatService.loadAllMessages().subscribe();
  }

  ngOnInit(): void {}

  async sendMessage() {
    try {
      if (this.message.length === 0) {
        return;
      }

      await this.chatService.addMessage(this.message);
    } catch (error) {
      this.notification.openSnackBar(error.message, 'Cerrar');
    } finally {
      this.message = '';
    }
  }
}
