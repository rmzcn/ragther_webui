import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'profile-secret-banner',
  templateUrl: './profile-secret-banner.component.html',
  styleUrls: ['./profile-secret-banner.component.css']
})
export class ProfileSecretBannerComponent implements OnInit {

  constructor() { }

  @Input() secretBanner : string;

  ngOnInit(): void {
  }

}
