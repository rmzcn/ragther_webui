import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class RemindService {

  constructor(private httpClient: HttpClient) { }

  Remind_Get(todoId:number, requesterUserName:string){
    return this.httpClient.get(apiurls.remindApiUrls.Remind_Get(todoId,requesterUserName));
  }
}
