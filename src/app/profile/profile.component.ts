import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserDetailModel } from '../services/BackendServices/API_Models/Get/profile_detail.model';
import { UserService } from '../services/BackendServices/user.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileDetail = new Subject<UserDetailModel>();
  public loading : boolean = false;
  public secretProfile: boolean;


  constructor(private sessionService: SessionService, private userService: UserService, private route: ActivatedRoute, private router: Router, private stringHelper: StringHelperService) { }

  ngOnInit(): void {
    this.getProfileFromDb()
  }

  setProfileStatus(data:boolean){
    this.secretProfile = data;
  }

  getProfileFromDb(){
    this.userService.GetUserProfile_Get(this.getUserName(), this.sessionService.getSessionValue())
      .subscribe( res => {
        this.profileDetail.next(<UserDetailModel>res);
      }, err => {
        if (this.stringHelper.Contains(err.error.result, "0004")) {
          this.router.navigate(['/404']);
        }
      });
  }

  public getUserName() : string {
    return this.route.snapshot.paramMap.get("userID");
  }

}
