import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";


@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  noticeCountData: number;
  private hubConnection: signalR.HubConnection;

  startNoticeConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:5001/notice')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  addTransferNoticeDataListener() {
    this.hubConnection.on('transfernoticedata', (data) => {
      this.noticeCountData = Number.parseInt(data);
      console.log(data);
    });
  }
}
