import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class TOIService {

  constructor(private httpClient: HttpClient) { }

  GetTagsOfInterests_Get(requesterUserName:string){
    return this.httpClient.get(apiurls.toiApiUrls.GetTagsOfInterests_Get(requesterUserName));
  }

  SetTagsOfInterests_Get(requesterUserName:string, tagList:string){
    // tagList example: "61+21+23+57" as array
    return this.httpClient.get(apiurls.toiApiUrls.SetTagsOfInterests_Get(requesterUserName,tagList));
  }
}
