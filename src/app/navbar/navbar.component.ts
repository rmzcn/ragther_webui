import { Component, OnInit } from '@angular/core';
import { DarkMode } from '../dark-mode';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isEnabledDarkMode: boolean;
  darkModeRef: DarkMode = new DarkMode();

  constructor(private toastService: ToastService) {
    this.isEnabledDarkMode = this.darkModeRef.isEnabled();
  }

  ngOnInit(): void {
  }

  darkMode(){
    if (this.isEnabledDarkMode) {
      this.darkModeRef.disable();
      this.isEnabledDarkMode = false;
      this.toastService.writeMessage('notification',"Karanlık Mod Kapatıldı ",3);
    }
    else{
      this.darkModeRef.enable();
      this.isEnabledDarkMode = true;
      this.toastService.writeMessage('notification',"Karanlık Mod Aktif ",3);
    }
  }

}
