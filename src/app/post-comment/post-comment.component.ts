import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OfferStatus } from '../Relations/offer_status';
import { TodoCommentModel } from '../services/BackendServices/API_Models/Get/comment.model';
import { CommentCreateModel } from '../services/BackendServices/API_Models/Post/comment.model';
import { CommentService } from '../services/BackendServices/comment.service';
import { angularAddress, backendAddress } from '../services/BackendServices/Config/apiurls';
import { SessionService } from '../services/BrowserServices/session.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit, OnChanges {

  @Input() todoIdFromParent: number;
  @Input() isRefreshed: number;
  @Input() todoOwner: string;
  @Output() countEvent: EventEmitter<any> = new EventEmitter();
  todoComments : TodoCommentModel[];
  isProgress : boolean = false;
  isNonComment: boolean = false;
  backendUrlBase = backendAddress;
  angularUrlBase = angularAddress;
  isTodoOwner: boolean;


  constructor(private commentService: CommentService, private sessionService:SessionService, private toastService: ToastService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
    if (this.todoOwner === this.sessionService.getSessionValue()) {
      this.isTodoOwner = true;
    }
    else{
      this.isTodoOwner = false;
    }
  }

  ngOnInit(): void {
    this.isNonComment = false;
    this.isProgress = true;
    this.getCommentsByTodoId();
  }

  getCommentsByTodoId(){
    this.commentService.GetTodoComments_Get(this.todoIdFromParent)
      .subscribe(response => {
        this.todoComments = <TodoCommentModel[]>response;
        this.isProgress = false;
        if (this.todoComments.length === 0 || typeof this.todoComments === 'undefined') {
          this.isNonComment = true;
        }
      }, error => {
        this.isProgress = false;
      });
  }

  printRemainingTime(date){
    let timeAsMinute = this.calculateTime(date);

    let hour;
    let minute;
    let day;
    let year;

    if (timeAsMinute < 0) {
      return `???`;
    }
    else if(timeAsMinute < 60){
      let result = Math.trunc(timeAsMinute);
      return `${result} dakika önce.`;
    }

    else if (timeAsMinute/60 > 1 && timeAsMinute/60 < 24) {
      hour = Math.trunc(timeAsMinute/60);
      minute = Math.trunc(timeAsMinute-(hour*60));
      return `${hour} saat ${minute} dakika önce`;
    }

    else if (timeAsMinute/(60*24) > 1 && timeAsMinute/(60*24) < 365) {
      day = Math.trunc(timeAsMinute/(60*24));
      hour = Math.trunc((timeAsMinute/60) - (day*24));
      return `${day} gün ${hour} saat önce.`;
    }
    else{
      year = timeAsMinute/(60*24*365);
      return `${year} yıl önce.`;
    }
  }

  calculateTime(date): number{
    let DatePast = new Date(date);
    let DateNow = new Date();
    let timeDiff = DateNow.getTime() - DatePast.getTime();
    return timeDiff / (1000 * 60);
  }

  public isCommentOwner(userName: string): boolean{
    if (this.sessionService.getSessionValue() === userName) {
      return true;
    }
    return false;
  }

  deleteComment(commentID: number){
    this.commentService.Delete_Get(commentID, this.sessionService.getSessionValue())
      .subscribe(response => {
        this._deleteFromLocal(commentID);
        this.countEvent.emit({todoId: this.todoIdFromParent});
        this.toastService.writeMessage('success',"Yorumunuz silindi",4);

        //burada yorumlar tekrardan yükleniyor bunu kaldırabilirsin.
        //bunun amacı sadece son yorumu sildiğimizde "hiç yorum yok" yazısının gözükmesi için
        this.getCommentsByTodoId();
      }, error => {
        console.log(error);
        this.toastService.writeMessage('danger',"Yorumunuz silinemedi.",4);
      });
  }

  _deleteFromLocal(commentID: number){
    for( var i = 0; i < this.todoComments.length; i++){
      if ( this.todoComments[i].id === commentID) {
        this.todoComments.splice(i, 1);
      }
    }
  }

  public AcceptOffer(commentID: number){
    this.commentService.AcceptOffer_Get(commentID,this.sessionService.getSessionValue())
      .subscribe( response => {
        this.getCommentByCommentId(commentID).offerStatus = new OfferStatus().Accepted;
        this.toastService.writeMessage('success',"Teklif kabul edildi.",3);
      }, error => {
        console.log(error)
        this.toastService.writeMessage('danger',"Teklif kabul edilemedi!!",3);
      });
  }

  public RejectOffer(commentID: number){
    this.commentService.RejectOffer_Get(commentID,this.sessionService.getSessionValue())
      .subscribe( response => {
        this.getCommentByCommentId(commentID).offerStatus = new OfferStatus().Rejected;
        this.toastService.writeMessage('success',"Teklif reddedildi.",3);
      }, error => {
        console.log(error)
        this.toastService.writeMessage('danger',"Teklif reddedilemedi!!",3);
      });
  }

  getCommentByCommentId(commentId: number){
    for( var i = 0; i < this.todoComments.length; i++){
      if ( this.todoComments[i].id === commentId) {
        return this.todoComments[i];
      }
    }
    return null;
  }

}
