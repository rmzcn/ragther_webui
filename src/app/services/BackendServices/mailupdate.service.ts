import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class MailupdateService {

  constructor(private httpClient: HttpClient) { }

  SendRequest_Get(requesterUserName:string, newMailAdress:string){
    return this.httpClient.get(apiurls.mailUpdateApiUrls.SendRequest_Get(requesterUserName,newMailAdress));
  }

  Update_Get(token:string){
    return this.httpClient.get(apiurls.mailUpdateApiUrls.Update_Get(token));
  }

}
