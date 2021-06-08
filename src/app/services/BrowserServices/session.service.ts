import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StringHelperService } from '../HelperServices/string-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookieService: CookieService, private stringHelper: StringHelperService) { }

   getSessionValue():string{
    let result = this.cookieService.get("session-value");
    if(!this.stringHelper.isStringNullOrEmpty(result)){
      return result;
    }
    else{
      return null;
    }
   }

   getSessionID():string{
    let result = this.cookieService.get("session-id");
    if(!this.stringHelper.isStringNullOrEmpty(result)){
      return result;
    }
    else{
      return null;
    }
   }

   deleteSession(){
     this.cookieService.delete("session-id");
     this.cookieService.delete("session-value");
   }

   setSessionID(ID: string){
    this.cookieService.set("session-id",ID,1);
   }

   setSessionValue(value: string){
    this.cookieService.set("session-value",value,1);
  }

  setLocation(lt:string, lng:string){
    this.cookieService.set("loaciton-lat",lt,1);
    this.cookieService.set("loaciton-lng",lng,1);
  }

  setAddress(address : string){
    this.cookieService.set("loaciton-adress",address,1);
  }

  getLocation(){
    let lt = this.cookieService.get("loaciton-lat");
    let lng = this.cookieService.get("loaciton-lng");
    if(!this.stringHelper.isStringNullOrEmpty(lt)){
      return {lat: lt, long: lng};
    }
    else{
      return null;
    }
  }

  getAddress(){

    let result = this.cookieService.get("loaciton-adress");
    if(!this.stringHelper.isStringNullOrEmpty(result)){
      return result;
    }
    else{
      return null;
    }
  }

}
