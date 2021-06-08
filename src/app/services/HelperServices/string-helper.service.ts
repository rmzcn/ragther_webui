import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringHelperService {

  constructor() { }

  isStringNullOrEmpty(input:string):boolean{
    if (!(typeof input != 'undefined' && typeof input != null && input && input.trim() != "")) {
      return true
    }
    else return false;
  }

  Contains(str:string, substr: string): boolean{
    if (this.isStringNullOrEmpty(str) || this.isStringNullOrEmpty(substr)) {
      return false;
    }
    if (str.length < substr.length) {
      return false;
    }
    for (let index = 0; index < str.length; index++) {
      if (substr[0] == str[index]) {
        let isContinued = true;
        for (let subIndex = 1; subIndex < substr.length; subIndex++) {
          if (index+subIndex >= str.length) {
            return false;
          }
          if (substr[subIndex] != str[index+subIndex]) {
            isContinued = false;
            break;
          }
        }
        if (isContinued) {
          return true;
        }
      }
    }
    return false;
  }

  deleteElement(str:string, startIndex: number, endIndex: number): string{
    let result = "";
    let isArrivedStartIndex = false;
    let isArriveEndIndex = false;
    for (let index = 0; index < str.length; index++) {
      if (index === startIndex) {
        isArrivedStartIndex = true;
      }
      if (index === endIndex) {
        isArriveEndIndex = true;
      }
      if (isArrivedStartIndex && !isArriveEndIndex) {
        continue;
      }
      result += str[index];
    }
    return result;
  }
}
