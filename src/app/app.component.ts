import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Location } from "@angular/common";
import { fadeAnimation } from './animation';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { SessionService } from './services/BrowserServices/session.service';
import { StringHelperService } from './services/HelperServices/string-helper.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RagtherWebUI';
  route: string;
  public isFooterDisplay: boolean;

  constructor(private location: Location, private router: Router, private sessionService: SessionService, private stringService: StringHelperService) {
    router.events.subscribe(val => {
      this.controlFooterForChatComponent();
      // this.checkIfLoggedIn();
    });
    registerLocaleData(localeTr);
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

  checkIfLoggedIn(){
    if (this.stringService.isStringNullOrEmpty(this.sessionService.getSessionValue())) {
      this.router.navigate(['/login']);
    }
  }

}
