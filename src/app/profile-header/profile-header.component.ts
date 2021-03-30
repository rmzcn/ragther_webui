import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css','./profile.css', './badges.css']
})
export class ProfileHeaderComponent implements OnInit {

  isSelf: boolean = true;
  isSendFriendship: boolean = false;
  isFriend : boolean = false;
  userName: string = "rmzncn";
  personName: string = "Ramazan Can";
  personSurname: string = "Gölgen";
  profileDescription: string = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium commodi corrupti exercitationem sunt beatae blanditiis vitae, illo ex reiciendis ipsa! Architecto illo, sapiente dolorem iure debitis aspernatur eum aperiam. Consequatur!";
  friendsNumber: number = 32;
  profileScore: number = 650;
  helpNumber: number = 14;

  constructor() { }

  ngOnInit(): void {
  }

}
