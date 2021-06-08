import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentCreateModel } from './API_Models/Post/comment.model';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private comments;
  constructor(private httpClient: HttpClient) { }

  GetTodoComments_Get(todoID:number){
    return this.httpClient.get(apiurls.commentApiUrls.GetTodoComments_Get(todoID));
  }

  Delete_Get(commentID:number, requesterUserName:string){
    return this.httpClient.get(apiurls.commentApiUrls.Delete_Get(commentID,requesterUserName));
  }

  Create_Post(commentModel:CommentCreateModel, requesterUserName:string){
    return this.httpClient.post(apiurls.commentApiUrls.Create_Post(requesterUserName), commentModel);
  }

  AcceptOffer_Get(commentID:number, requesterUserName:string){
    return this.httpClient.get(apiurls.commentApiUrls.AcceptOffer_Get(commentID,requesterUserName));
  }

  RejectOffer_Get(commentID:number, requesterUserName:string){
    return this.httpClient.get(apiurls.commentApiUrls.RejectOffer_Get(commentID,requesterUserName));
  }
}
