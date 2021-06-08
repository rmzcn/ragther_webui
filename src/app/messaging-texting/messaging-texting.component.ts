import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ChatHeadModelGet } from '../services/BackendServices/API_Models/Get/chat-head.model';
import { ChatMessageModelGet } from '../services/BackendServices/API_Models/Get/chat-message.model';
import { ChatService } from '../services/BackendServices/chat.service';
import { backendAddress } from '../services/BackendServices/Config/apiurls';
import { FirendshipService } from '../services/BackendServices/firendship.service';
import { MessageService } from '../services/BackendServices/message.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'messaging-texting',
  templateUrl: './messaging-texting.component.html',
  styleUrls: ['./messaging-texting.component.css']
})
export class MessagingTextingComponent implements OnInit {

  constructor(private chatService: ChatService, private messageService: MessageService, private stringService: StringHelperService, private sessionService: SessionService, private toastService: ToastService, private friendshipService: FirendshipService, private router : Router, private route: ActivatedRoute) { }

  messageHead = new Subject<ChatHeadModelGet>();
  backendUrlBase = backendAddress;

  messages : ChatMessageModelGet[] = []
  sessionOwner = this.sessionService.getSessionValue();

  @ViewChild('scroll') private scrollContainer: ElementRef;


  ngOnInit(): void {
    this.getChatHead();
    setInterval( () => {
      this.getMessage();
    }, 500);

  }

  // ngAfterViewChecked() {

  // }

  scrollToBottom(): void {
      try {
          this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
  }

  public getChatID() : string {
    return this.route.snapshot.paramMap.get("chatID");
  }

  getChatHead(){
    this.chatService.GetChatHead(this.sessionService.getSessionValue(), Number.parseInt(this.getChatID()))
      .subscribe( res => {
        this.messageHead.next(<ChatHeadModelGet>res);
        this.firstMessageRequest();

      }, err => {
        if (this.stringService.Contains(err.error.error,"0069")) {
          this.router.navigate(["/404"]);
        }
      });
  }

  firstMessageRequest(){
    this.messageService.GetMessages_Get(Number.parseInt(this.getChatID()),this.sessionService.getSessionValue())
      .subscribe( res => {
        this.messages = <ChatMessageModelGet[]>res;
        setTimeout( () =>{
          this.scrollToBottom();
        },100 );
      }, err => {
        this.toastService.writeMessage("danger","Mesajlar yüklenemedi",3);
      });

  }

  getMessage(){
    this.messageService.GetUnreadMessages_Get(Number.parseInt(this.getChatID()),this.sessionService.getSessionValue())
      .subscribe( res => {
        let result = <ChatMessageModelGet[]>res;
        for (let index = 0; index < result.length; index++) {
          this.messages.push(result[index]);
        }
        setTimeout( () =>{
          this.scrollToBottom();
        },100 );
      }, err => {

      });
  }

  sendMessage(contentInput: HTMLInputElement){
    if (this.stringService.isStringNullOrEmpty(contentInput.value.trim())) {
      return;
    }
    this.messageService.SendMessage_Get(this.sessionService.getSessionValue(),Number.parseInt(this.getChatID()),contentInput.value)
      .subscribe( res => {
        this.messages.push( {
          authorUserName : this.sessionOwner,
          messageId : 0,
          isRead : false,
          chatId : 0,
          content : contentInput.value,
          createdAt : new Date()
        });
        contentInput.value = "";
        setTimeout( () =>{
          this.scrollToBottom();
        },100 );
      }, err => {
        this.toastService.writeMessage("danger","Mesaj gönderilemedi!",3);
      });
  }



}
