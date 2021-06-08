import { Component, Input, OnInit , Output, SimpleChanges, ViewEncapsulation, EventEmitter } from '@angular/core';
import { LocationServiceService } from '../location-service.service';
import { TodoModelGet, UserInfoModelInner } from '../services/BackendServices/API_Models/Get/todo_get.model';
import { TodoService } from '../services/BackendServices/todo.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import {} from 'googlemaps';
import {LOCALE_ID} from '@angular/core';
import { apiurls, backendAddress, angularAddress } from '../services/BackendServices/Config/apiurls';
import { CommentCreateModel } from '../services/BackendServices/API_Models/Post/comment.model';
import { CommentService } from '../services/BackendServices/comment.service';
import { ToastService } from '../toast.service';
import { LikeService } from '../services/BackendServices/like.service';
import codes from '../services/BackendServices/response_codes.json'
import { RemindService } from '../services/BackendServices/remind.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnChanges } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'home-todos',
  templateUrl: './home-todos.component.html',
  styleUrls: ['./home-todos.component.css']
})
export class HomeTodosComponent implements OnInit {

  @Input() todoIdForSinglePage : number;
  @Input() userNameForProfilePage : string;
  @Input() tagNameForTodoListByTag : string;
  @Output() secretProfile = new EventEmitter<boolean>();;

  constructor(private todoService: TodoService, private sessionService: SessionService, private stringHelper: StringHelperService, private locationService: LocationServiceService, private commentService: CommentService, private toastService: ToastService, private likeService: LikeService, private remindService: RemindService, private modalService: NgbModal, private router:Router) { }


  public todos: TodoModelGet[];
  lat : string;
  long : string;
  loader : boolean = false;
  locationError : boolean = false;
  backendUrlBase = backendAddress;
  angularUrlBase = angularAddress;
  isRefreshed :number = 0;
  likedList : number[];
  public currentTodoForModal: TodoModelGet  = {
    todoId : 0,
    userInfo: {firstName: "", lastName: "", profileImageURL:"", userName:"", userId:0},
    tags : [],
    workWiths: [],
    imageUrl : "",
    description : "",
    untilWhen : new Date(),
    createdAt : new Date(),
    locationLatitude : "",
    locationLongitude : "",
    todoCondition : "",
    likeCount : 0,
    remindCount : 0,
    commentCount : 0,
    address : ""};

  currentTodoId: number ;
  currentTodoCreatorUserName:string;

  anyTodo :boolean = true;



  ngOnInit(): void {
    if (this.todoIdForSinglePage !== undefined) {
      // db den tek todo getir.
      this.todoService.GetSingleTodo_Get(this.todoIdForSinglePage,this.sessionService.getSessionValue())
        .subscribe( res => {
          console.log(res);
          let result : TodoModelGet[] = [];
          result.push(<TodoModelGet>res);
          this.todos = result;
          this.loader = false;
        }, err => {
          if (this.stringHelper.Contains(err.error.error, "0011")) {
            this.anyTodo = false;
          }
          this.router.navigate(['/404']);
          this.anyTodo = false;
          this.loader = false;
        });
    }
    else if (this.userNameForProfilePage !== undefined) {
      // db den kullanıcıya ait todoları getir.
      this.getTodosByUser();
    }
    else if (this.tagNameForTodoListByTag !== undefined) {
      // db den belirtilen etikete ait todoları getir.
      this.todoService.GetUserTodos_Get(this.tagNameForTodoListByTag,this.sessionService.getSessionValue())
        .subscribe( res => {
          this.todos = <TodoModelGet[]>res;
          this.loader = false;
        }, err => {
          if (this.stringHelper.Contains(err.error.error, "0012")) {
            this.anyTodo = false;
          }
          this.anyTodo = false;
          this.loader = false;
        });
    }
    else{
      // ana sayfa todoları
      this.getTodosFromDB();
    }
    this.loader = true;
    this.getLocation();
  }

  getTodosByUser(){
    this.todoService.GetUserTodos_Get(this.userNameForProfilePage,this.sessionService.getSessionValue())
    .subscribe( res => {
      this.todos = <TodoModelGet[]>res;
      this.loader = false;
    }, err => {
      if (this.stringHelper.Contains(err.error.error, "0012")) {
        this.anyTodo = false;
      }
      // console.log(err);
      else if (err.status === 401) {
        this.secretProfile.emit(true);
      }
      this.anyTodo = false;
      this.loader = false;
    });
  }

  public refreshComments(){
    this.isRefreshed++;
  }


  updateCurrentTodo(todoId: number){
    this.currentTodoId = todoId;
    this.currentTodoForModal = this.getTodoByTodoId(todoId);
    this.currentTodoCreatorUserName = this.currentTodoForModal.userInfo.userName;
  }

  isTodoOwner(todo: TodoModelGet){
    if (todo === undefined) {
      return false;
    }
    else if (this.sessionService.getSessionID() === todo.userInfo.userId.toString()) {
      return true;
    }
    return false;
  }

  getTodoOwnersUserName(todoId: number):string{
    for( var i = 0; i < this.todos.length; i++){
      if ( this.todos[i].todoId === todoId) {
        return this.todos[i].userInfo.userName;
      }
    }
    return null;
  }

  getTodosFromDB(){
    this.todoService.GetMainPageTodos_Get(this.sessionService.getSessionValue())
      .subscribe( response => {
        this.todos = <TodoModelGet[]>response;
        this.loader = false;
      }, error => {
        if (this.stringHelper.Contains(error.error.error, "0012")) {
          this.anyTodo = false;
        }
        this.anyTodo = false;
        this.loader = false;
      });
  }

  printRemainingTime(date){
    let timeAsMinute = this.calculateRemainingTime(date);

    let hour;
    let minute;
    let day;
    let year;

    if (timeAsMinute < 0) {
      return `Görevin gerçekleştirilme süresi doldu..`;
    }
    else if(timeAsMinute < 60){
      let result = Math.trunc(timeAsMinute);
      return `${result} dakika kaldı...`;
    }

    else if (timeAsMinute/60 > 1 && timeAsMinute/60 < 24) {
      hour = Math.trunc(timeAsMinute/60);
      minute = Math.trunc(timeAsMinute-(hour*60));
      return `${hour} saat ${minute} dakika kaldı...`;
    }

    else if (timeAsMinute/(60*24) > 1 && timeAsMinute/(60*24) < 365) {
      day = Math.trunc(timeAsMinute/(60*24));
      hour = Math.trunc((timeAsMinute/60) - (day*24));
      return `${day} gün ${hour} saat kaldı...`;
    }
    else{
      year = timeAsMinute/(60*24*365);
      return `${year} yıl kaldı...`;
    }
  }

  calculateRemainingTime(date): number{
    let DateFuture = new Date(date);
    let DateNow = new Date();
    let timeDiff = DateFuture.getTime() - DateNow.getTime();
    return timeDiff / (1000 * 60);
  }


  getLocation(){
    this.locationService.getPosition().then(pos=>
      {
        if (typeof pos.lat ===  "number" && typeof pos.lng === "number") {
          this.lat = pos.lat;
          this.long = pos.lng;
          this.locationError = false;
        }
        else{
          console.log("Konum alınırken hata");
          this.locationError = true;
        }
      });
  }

  Remind(todoId: number){
    this.remindService.Remind_Get(todoId,this.sessionService.getSessionValue())
      .subscribe(response => {
        this.getTodoByTodoId(todoId).remindCount++;
        this.toastService.writeMessage('emoji', "Hatırlattın 💪💪💪", 3);
      }, error =>{
        if (this.stringHelper.Contains(error.error.error, "0033")) {
          this.toastService.writeMessage('emoji', "Sakin ol. Sadece bir defa hatırlatma yapabilirsin. 🤚🤚🤚", 3);
        }
      });
  }

  DeleteTodo(todoId: number){
    this.todoService.Delete_Get(todoId, this.sessionService.getSessionValue())
      .subscribe( response => {
        this.toastService.writeMessage('success',"Görev silindi.", 3);
        this._deleteTodoFromLocal(todoId);
      }, error => {
        console.log(error.error.error);
        this.toastService.writeMessage('danger',"Görev silinemedi.", 3);
      });
  }

  deleteConfirmationForTodo(content, todoId:number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:'sm', centered: true}).result.then((result) => {
      if (result==='yes') {
        this.DeleteTodo(todoId);
      }
      else if ('no') {
        this.toastService.writeMessage('info',"Görev silme işlemi iptal edildi.", 3);
      }
    }, (reason) => {
      this.toastService.writeMessage('info',"Görev silme işlemi iptal edildi.", 3);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  _deleteTodoFromLocal(todoId:number){
    for (let index = 0; index < this.todos.length; index++) {
      if (this.todos[index].todoId === todoId) {
        this.todos.splice(index,1);
      }

    }
  }

  Like(todoId: number){
    this.likeService.Like_Get(todoId,this.sessionService.getSessionValue())
      .subscribe(response => {
        this.getTodoByTodoId(todoId).likeCount++;
        this.toastService.writeMessage('emoji', "Beğendin 😍😍😍", 3);
      }, error =>{
        if (this.stringHelper.Contains(error.error.error, "0029")) {
          this.UnLike(todoId);
        }
      });
  }

  UnLike(todoId: number){
    this.likeService.UnLike_Get(todoId,this.sessionService.getSessionValue())
      .subscribe(response => {
        this.getTodoByTodoId(todoId).likeCount--;
        this.toastService.writeMessage('emoji', "Beğenmedin 😥😥😥", 3);
      }, error =>{
        if (this.stringHelper.Contains(error.error.error, "0031")) {
          this.UnLike(todoId);
        }
      });
  }

  Comment(todo: TodoModelGet, input: HTMLInputElement, checkInput: HTMLInputElement){
    if (this.stringHelper.isStringNullOrEmpty(input.value)) {
      this.toastService.writeMessage('danger',"Boş yorum yapamazsın!.",3);
      return;
    }
    let commentModel: CommentCreateModel = {
      Content: input.value,
      TodoId: todo.todoId,
      IsOffer: false,
      UserId: Number.parseInt(this.sessionService.getSessionID())
    };

    if (typeof checkInput === "undefined") {
      commentModel.IsOffer = false;
    }
    else if (checkInput.checked) {
      commentModel.IsOffer = true;
    }

    this.commentService.Create_Post(commentModel,this.sessionService.getSessionValue())
      .subscribe( response => {
        this.toastService.writeMessage('success',"Yorumunuz yayınlandı.",3);
        input.value = "";
        checkInput.checked = false;
        this.getTodoByTodoId(todo.todoId).commentCount ++;
        this.refreshComments();
      }, error => {
        this.toastService.writeMessage('danger',"Yorum yayınlanamadı!.",3);
        input.value = "";
      });
  }

  deleteCommentCount(data){
    for( var i = 0; i < this.todos.length; i++){
      if ( this.todos[i].todoId === data.todoId) {
        this.todos[i].commentCount -= 1;
        break;
      }
    }
  }

  getTodoByTodoId(todoId: number){
    for( var i = 0; i < this.todos.length; i++){
      if ( this.todos[i].todoId === todoId) {
        return this.todos[i];
      }
    }
    return null;
  }


}
