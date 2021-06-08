import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {

  public isMobile: boolean;
  public isMenuMain: boolean;
  public anyChatSelected : boolean = true;

  constructor(private route: ActivatedRoute) {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    }
    else{
      this.isMobile = false;
    }

    if(this.getChatID() === null){
      this.isMenuMain = true;
    }
    else{
      this.isMenuMain = false;
    }
  }

  ngOnInit(): void {
    if (this.getChatID() === null) {
      this.anyChatSelected = false;
    }
  }

  public getChatID() : string {
    return this.route.snapshot.paramMap.get("chatID");
  }

}
