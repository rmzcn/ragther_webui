export class TodoModelGet {
  todoId : number;
  userInfo: UserInfoModelInner;
  tags : string[];
  workWiths: string[];
  imageUrl : string;
  description : string;
  untilWhen : Date;
  createdAt : Date;
  locationLatitude : string;
  locationLongitude : string;
  todoCondition : string;
  likeCount : number;
  remindCount : number;
  commentCount : number;
  address : string;
}

export class UserInfoModelInner {
  userId : number;
  userName : string;
  firstName : string;
  lastName : string;
  profileImageURL : string;
}
