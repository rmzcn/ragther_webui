import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoCreateModel } from './API_Models/Post/todo_create.model';
import { TodoUpdateModel } from './API_Models/Post/todo_update.model';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  Create_Post(todoCreateModel:TodoCreateModel){
    return this.httpClient.post(apiurls.todoApiUrls.Create_Post(),todoCreateModel);
  }

  Update_Post(requesterUserName:string, todoCreateModel:TodoUpdateModel){
    return this.httpClient.post(apiurls.todoApiUrls.Update_Post(requesterUserName),todoCreateModel);
  }

  ImageUpload_Post(todoId:number, requesterUserName:string, file:File){
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post(apiurls.todoApiUrls.ImageUpload_Post(todoId,requesterUserName), formData, {reportProgress: true, observe: 'events'});
  }

  Delete_Get(todoID:number, requesterUserName:string){
    return this.httpClient.get(apiurls.todoApiUrls.Delete_Get(todoID,requesterUserName));
  }

  GetUserTodos_Get(userName:string, requesterUserName:string){
    return this.httpClient.get(apiurls.todoApiUrls.GetUserTodos_Get(userName,requesterUserName));
  }

  GetMainPageTodos_Get(requesterUserName:string, latitude:string=null, longitude:string=null, near: boolean = false){
    return this.httpClient.get(apiurls.todoApiUrls.GetMainPageTodos_Get(requesterUserName,latitude,longitude,near));
  }

  GetSingleTodo_Get(todoID:number, requesterUserName:string){
    return this.httpClient.get(apiurls.todoApiUrls.GetSingleTodo_Get(todoID,requesterUserName));
  }

  GetTodoByTagName_Get(tagName:string, requesterUserName:string){
    return this.httpClient.get(apiurls.todoApiUrls.GetTodoByTagName_Get(tagName,requesterUserName));
  }

}
