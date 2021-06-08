import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private httpClient: HttpClient) { }

  Like_Get(todoId:number, requesterUserName:string){
    return this.httpClient.get(apiurls.likeApiUrls.Like_Get(todoId,requesterUserName));
  }

  UnLike_Get(todoId:number, requesterUserName:string){
    return this.httpClient.get(apiurls.likeApiUrls.UnLike_Get(todoId,requesterUserName));
  }
}
