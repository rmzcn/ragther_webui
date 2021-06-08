import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/BrowserServices/session.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {

  constructor(private sessionService: SessionService, private toast: ToastService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.sessionService.deleteSession();
    console.log(this.sessionService.getSessionValue());
    this.toast.writeMessage("notification", "Başarıyla çıkış yaptınız Görüşmek üzere 👋👋", 4);
    this.router.navigate(['/login']);
    window.location.assign("http://localhost:4200/login")

  }

}
