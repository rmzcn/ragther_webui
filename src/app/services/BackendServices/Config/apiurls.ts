export const baseUrl = "https://localhost:5001/api/";

export const backendAddress = "https://localhost:5001";
export const angularAddress = "https://localhost:4200";

class UserApiUrls {
  private controller = "User/";
  public UserProfile_Get(userName: string, requesterUserName: string)
  {
    return baseUrl+this.controller+userName+"/profile?requesterUserName="+requesterUserName;
  }

  public ForgetPassword_Get(newEmail:string)
  {
    return baseUrl+this.controller+"password/refresh?newEmail="+newEmail;
  }

  public SetPassword_Get(requesterUserName:string, oldPassword:string, newPassword:string)
  {
    return baseUrl+this.controller+`password/update?requesterUserName=${requesterUserName}&oldPassword=${oldPassword}&newPassword=${newPassword}`;
  }

  public GetPassword_Get(requesterUserName:string)
  {
    return baseUrl+this.controller+"password/get?requesterUserName="+requesterUserName;
  }

  public Register_Post()
  {
    return baseUrl+this.controller+"register";
  }

  public Login_Post()
  {
    return baseUrl+this.controller+"login";
  }

  public GetUsersByFilter_Get(filterString:string)
  {
    return baseUrl+this.controller+"search/"+filterString;
  }
}

class CommentApiUrls {
  private controller = "Comment";
  public Create_Post(requesterUserName:string)
  {
    return baseUrl+this.controller+"/create?requesterUserName="+requesterUserName;
  }

  public Delete_Get(commentID:number, requesterUserName:string)
  {
    return baseUrl+this.controller+`/delete?commentID=${commentID}&requesterUserName=${requesterUserName}`;
  }

  public GetTodoComments_Get(todoID:number)
  {
    return baseUrl+this.controller+`?todoID=${todoID}`;
  }

  public AcceptOffer_Get(commentID:number, requesterUserName:string)
  {
    return baseUrl+this.controller+`/${commentID}/accept-offer?requesterUserName=${requesterUserName}`;
  }

  public RejectOffer_Get(commentID:number, requesterUserName:string)
  {
    return baseUrl+this.controller+`/${commentID}/reject-offer?requesterUserName=${requesterUserName}`;
  }

}

class FriendshipApiUrls {
  private controller = "Friendship/";
  public SendRequest_Get(senderUserName:string, recipientUserName:string)
  {
    return baseUrl+this.controller+`send-request?senderUserName=${senderUserName}&recipientUserName=${recipientUserName}`;
  }

  public RejectRequest_Get(rejecterUserName:string, senderUserName:string)
  {
    return baseUrl+this.controller+`reject?rejecterUserName=${rejecterUserName}&senderUserName=${senderUserName}`;
  }

  public RevokeFriendship_Get(revokerUserName:string, recipientUserName:string)
  {
    return baseUrl+this.controller+`revoke?revokerUserName=${revokerUserName}&recipientUserName=${recipientUserName}`;
  }

  public AcceptFriendship_Get(accepterUserName:string, senderUserName:string)
  {
    return baseUrl+this.controller+`accept?accepterUserName=${accepterUserName}&senderUserName=${senderUserName}`;
  }

  public GetFriendshipStatus_Get(requesterUserName:string, targetUserName:string)
  {
    return baseUrl+this.controller+`get-status?requesterUserName=${requesterUserName}&targetUserName=${targetUserName}`;
  }

  public GetFriends_Get(requesterUserName:string)
  {
    return baseUrl+this.controller+`get-friends?requesterUserName=${requesterUserName}`;
  }

}

class LikeApiUrls {
  private controller = "Like/";
  public Like_Get(todoId:number, requesterUserName:string)
  {
    return baseUrl+this.controller+`like?todoId=${todoId}&requesterUserName=${requesterUserName}`;
  }

  public UnLike_Get(todoId:number, requesterUserName:string)
  {
    return baseUrl+this.controller+`unlike?todoId=${todoId}&requesterUserName=${requesterUserName}`;
  }
}

class MailUpdateApiUrls {
  private controller = "MailUpdate/";
  public SendRequest_Get(requesterUserName:string, newMailAdress:string)
  {
    return baseUrl+this.controller+`send-request?requesterUserName=${requesterUserName}&newMailAdress=${newMailAdress}`;
  }

  public Update_Get(token:string)
  {
    return baseUrl+this.controller+`update?token=${token}`;
  }
}

class NoticeApiUrls {
  private controller = "Notice/";
  public DeleteAll_Get(requesterUserName:string)
  {
    return baseUrl+this.controller+`delete-all?requesterUserName=${requesterUserName}`;
  }

  public GetAll_Get(requesterUserName:string)
  {
    return baseUrl+this.controller+`get-notices?requesterUserName=${requesterUserName}`;
  }

  public ReadAll_Get(requesterUserName:string)
  {
    return baseUrl+this.controller+`read-notices?requesterUserName=${requesterUserName}`;
  }

  public UnreadCount(requesterUserName:string){
    return baseUrl+this.controller+`unread-notices-count?requesterUserName=${requesterUserName}`;
  }
}

class ProfileUpdateApiUrls {
  private controller = "ProfileUpdate/";
  public UploadProfileImage_Post(requesterUserName:string)
  {
    return baseUrl+this.controller+`upload-profile-image?requesterUserName=${requesterUserName}`;
  }

  public SetVisibility_Get(requesterUserName:string, visible:boolean)
  {
    return baseUrl+this.controller+`set-visibility?requesterUserName=${requesterUserName}&visible=${visible}`;
  }

  public UpdateHiddenDescription_Get(requesterUserName:string, newHiddenDescription:string)
  {
    return baseUrl+this.controller+`set-hidden-description?requesterUserName=${requesterUserName}&newHiddenDescription=${newHiddenDescription}`;
  }

  public UpdateProfileDescription_Get(requesterUserName:string, newDescription:string)
  {
    return baseUrl+this.controller+`set-profile-description?requesterUserName=${requesterUserName}&newDescription=${newDescription}`;
  }

}

class RemindApiUrls {
  private controller = "Remind";
  public Remind_Get(todoId:number, requesterUserName:string)
  {
    return baseUrl+this.controller+`?todoId=${todoId}&requesterUserName=${requesterUserName}`;
  }
}

class TagApiUrls {
  private controller = "Tag";
  public Create_Post(requesterUserName:string)
  {
    return baseUrl+this.controller+`?requesterUserName=${requesterUserName}`;
  }

  public GetTagsByFilter_Get(filter:string, requesterUserName:string)
  {
    return baseUrl+this.controller+`/getbyfilter?filter=${filter}&requesterUserName=${requesterUserName}`;
  }
}

class TodoApiUrls {
  private controller = "Todo/";
  public Create_Post()
  {
    return baseUrl+this.controller+`create`;
  }

  public Update_Post(requesterUserName:string)
  {
    return baseUrl+this.controller+`update?requesterUserName=${requesterUserName}`;
  }

  public ImageUpload_Post(todoId:number, requesterUserName:string)
  {
    return baseUrl+this.controller+`imageupload?todoId=${todoId}&requesterUserName=${requesterUserName}`;
  }

  public Delete_Get(todoID:number, requesterUserName:string)
  {
    return baseUrl+this.controller+`delete?requesterUserName=${requesterUserName}&todoId=${todoID}`;
  }

  public GetUserTodos_Get(userName:string, requesterUserName:string)
  {
    return baseUrl+this.controller+`user/${userName}?requesterUserName=${requesterUserName}`;
  }

  public GetMainPageTodos_Get(requesterUserName:string, latitude:string=null, longitude:string=null, near: boolean = false)
  {
    if ((latitude == null || longitude == null)) {
      return baseUrl+this.controller+`home?requesterUserName=${requesterUserName}&near=${near}`;
    }
    else{
      return baseUrl+this.controller+`home?requesterUserName=${requesterUserName}&near=${near}&latitude=${latitude}&longitude=${longitude}`;
    }
  }

  public GetSingleTodo_Get(todoID:number, requesterUserName:string)
  {
    return baseUrl+this.controller+`single/${todoID}?requesterUserName=${requesterUserName}`;
  }

  public GetTodoByTagName_Get(tagName:string, requesterUserName:string)
  {
    return baseUrl+this.controller+`bytagname/${tagName}?requesterUserName=${requesterUserName}`;
  }


}

class ToiApiUrls {
  private controller = "TOI/";
  public GetTagsOfInterests_Get(requesterUserName:string)
  {
    return baseUrl+this.controller+`/${requesterUserName}`;
  }

  public SetTagsOfInterests_Get(requesterUserName:string, tagList:string)
  {
    // tagList example: "61+21+23+57"
    return baseUrl+this.controller+`${requesterUserName}/set?tagList=${tagList}`;
  }
}

// class WorkerApiUrls {
//   private controller = "Worker/";
//   public AcceptWorkerOffer_Get(requesterUserName:string, todoId:number)
//   {
//     return baseUrl+this.controller+`accept?requesterUserName=${requesterUserName}&todoId=${todoId}`;
//   }

// }

class ChatApiUrls {
  private controller = "Chat/";
  public CreateChat_Get(requesterUserName: string, secondUserName: string)
  {
    return baseUrl+this.controller+`create?requesterUserName=${requesterUserName}&secondUserName=${secondUserName}`;
  }

  GetChats(requesterUserName: string)
  {
    return baseUrl+this.controller+`get-chats?requesterUserName=${requesterUserName}`;
  }

  public GetChatHead(requesterUserName:string, chatId:number){
    return baseUrl+this.controller+`get-head?requesterUserName=${requesterUserName}&chatId=${chatId}`;
  }
}

class MessageApiUrls {
  private controller = "Message/";
  public SendMessage_Get(senderUserName: string, chatId: number, content: string)
  {
    return baseUrl+this.controller+`send-message?senderUserName=${senderUserName}&chatId=${chatId}&content=${content}`;
  }

  public GetUnreadMessages_Get(chatId: number, requesterUserName: string)
  {
    return baseUrl+this.controller+`get-interval?chatId=${chatId}&requesterUserName=${requesterUserName}`;
  }

  public GetMessages_Get(chatId: number, requesterUserName: string)
  {
    return baseUrl+this.controller+`get-messages?chatId=${chatId}&requesterUserName=${requesterUserName}`;
  }
}

export class apiurls {
  public static userApiUrls: UserApiUrls = new UserApiUrls();
  public static commentApiUrls: CommentApiUrls = new CommentApiUrls();
  public static likeApiUrls: LikeApiUrls = new LikeApiUrls();
  public static friendshipApiUrls: FriendshipApiUrls = new FriendshipApiUrls();
  public static mailUpdateApiUrls: MailUpdateApiUrls = new MailUpdateApiUrls();
  public static noticeApiUrls: NoticeApiUrls = new NoticeApiUrls();
  public static profileUpdateApiUrls: ProfileUpdateApiUrls = new ProfileUpdateApiUrls();
  public static remindApiUrls: RemindApiUrls = new RemindApiUrls();
  public static tagApiUrls: TagApiUrls = new TagApiUrls();
  public static todoApiUrls: TodoApiUrls = new TodoApiUrls();
  public static toiApiUrls: ToiApiUrls = new ToiApiUrls();
  public static chatApiUrls: ChatApiUrls = new ChatApiUrls();
  public static messageApiUrls: MessageApiUrls = new MessageApiUrls();
}
