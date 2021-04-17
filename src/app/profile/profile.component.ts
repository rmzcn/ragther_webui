import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public isSecretProfile: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
