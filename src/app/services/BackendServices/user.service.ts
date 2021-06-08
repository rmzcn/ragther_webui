import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginModel } from './API_Models/Post/user_login.model';
import { UserRegisterModel } from './API_Models/Post/user_register.model';
import { apiurls } from './Config/apiurls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  GetUserProfile_Get(userName: string, requesterUserName: string){
    return this.httpClient.get(apiurls.userApiUrls.UserProfile_Get(userName,requesterUserName));
  }

  ForgetPassword_Get(newMailAddress: string){
    return this.httpClient.get(apiurls.userApiUrls.ForgetPassword_Get(newMailAddress));
  }

  SetPassword_Get(requesterUserName:string, oldPassword:string, newPassword:string){
    return this.httpClient.get(apiurls.userApiUrls.SetPassword_Get(requesterUserName,oldPassword,newPassword));
  }

  GetPassword_Get(requesterUserName:string){
    return this.httpClient.get(apiurls.userApiUrls.GetPassword_Get(requesterUserName));
  }

  Login_Post(userLoginModel:UserLoginModel){
    return this.httpClient.post(apiurls.userApiUrls.Login_Post(),userLoginModel);
  }

  Register_Post(userRegisterModel:UserRegisterModel){
    return this.httpClient.post(apiurls.userApiUrls.Register_Post(),userRegisterModel);
  }

  GetUsersByFilter_Get(filterString:string){
    return this.httpClient.get(apiurls.userApiUrls.GetUsersByFilter_Get(filterString));
  }

}
