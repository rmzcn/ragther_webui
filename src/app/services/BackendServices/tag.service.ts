import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagCreateModel } from './API_Models/Post/tag_create.model';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient) { }

  Create_Post(tagCreateModel:TagCreateModel, requesterUserName:string){
    return this.httpClient.post(apiurls.tagApiUrls.Create_Post(requesterUserName),tagCreateModel);
  }

  GetTagsByFilter_Get(filter:string, requesterUserName:string){
    return this.httpClient.get(apiurls.tagApiUrls.GetTagsByFilter_Get(filter,requesterUserName));
  }
}
