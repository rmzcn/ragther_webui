import { Component, OnInit } from '@angular/core';
import { TagGetModel } from '../services/BackendServices/API_Models/Get/tag.model';
import { UserInfoModelInner } from '../services/BackendServices/API_Models/Get/todo_get.model';
import { angularAddress, backendAddress } from '../services/BackendServices/Config/apiurls';
import { TagService } from '../services/BackendServices/tag.service';
import { UserService } from '../services/BackendServices/user.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private toastService:ToastService, private stringHelper: StringHelperService, private UserService: UserService, private tagService:TagService, private sessionService: SessionService) { }
  backendUrlBase = backendAddress;
  angularUrlBase = angularAddress;

  userResults : UserInfoModelInner[] = [];
  tagResults: TagGetModel[] = [];


  filterString : string = "";

  ngOnInit(): void {
    setInterval( () => {
      this.startSearching()
    }, 900)
  }

  startSearching(){
    if (!this.stringHelper.isStringNullOrEmpty(this.filterString)) {
      this.UserService.GetUsersByFilter_Get(this.filterString)
        .subscribe( res => {
          this.userResults = <UserInfoModelInner[]>res;
        }, error => {
          console.log(error)
        });
      this.tagService.GetTagsByFilter_Get(this.filterString, this.sessionService.getSessionValue())
      .subscribe( res => {
        this.tagResults = <TagGetModel[]>res;
      }, error => {
        console.log(error)
      });
    }
  }

}
