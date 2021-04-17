import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'messaging-texting',
  templateUrl: './messaging-texting.component.html',
  styleUrls: ['./messaging-texting.component.css']
})
export class MessagingTextingComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public getChatID() : string {
    return this.route.snapshot.paramMap.get("chatID");
  }

}
