import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class ProfileupdateService {

  constructor(private httpClient: HttpClient) { }

  UploadProfileImage_Post(requesterUserName:string, file:File){
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post(apiurls.profileUpdateApiUrls.UploadProfileImage_Post(requesterUserName), formData, {reportProgress: true, observe: 'events'});
  }

  SetVisibility_Get(requesterUserName:string, visible:boolean){
    return this.httpClient.get(apiurls.profileUpdateApiUrls.SetVisibility_Get(requesterUserName,visible));
  }

  UpdateHiddenDescription_Get(requesterUserName:string, newHiddenDescription:string){
    return this.httpClient.get(apiurls.profileUpdateApiUrls.UpdateHiddenDescription_Get(requesterUserName,newHiddenDescription));
  }

  UpdateProfileDescription_Get(requesterUserName:string, newDescription:string){
    return this.httpClient.get(apiurls.profileUpdateApiUrls.UpdateProfileDescription_Get(requesterUserName,newDescription));
  }
}
