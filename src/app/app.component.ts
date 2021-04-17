import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Location } from "@angular/common";
import { fadeAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RagtherWebUI';
  route: string;
  public isFooterDisplay: boolean;

  constructor(private location: Location, private router: Router) {
    router.events.subscribe(val => {
      this.controlFooterForChatComponent();
    });
  }


  // Not showing footer for chat screen
  // therefore, we're setting to 'isFooterDisplay' variable
  controlFooterForChatComponent(){
    if (this.location.path().includes("/chat")) {
      this.route = this.location.path();
      this.isFooterDisplay = false;
    } else {
      this.route = "Home";
      this.isFooterDisplay = true;
    }
  }

}
