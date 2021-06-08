import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LocationServiceService } from '../location-service.service';
import {} from 'googlemaps';
import { ToastService } from '../toast.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { TagService } from '../services/BackendServices/tag.service';
import { TagGetModel } from '../services/BackendServices/API_Models/Get/tag.model';
import { TagCreateModel } from '../services/BackendServices/API_Models/Post/tag_create.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoCreateModel } from '../services/BackendServices/API_Models/Post/todo_create.model';
import { TodoService } from '../services/BackendServices/todo.service';
import { Router } from '@angular/router';
import { SuccessResultFromTodoUpload } from '../services/BackendServices/API_Models/Get/success_result_from_todo_upload.model';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
  styleUrls: ['./content-add.component.css']
})
export class ContentAddComponent implements OnInit {

  constructor(private locationService: LocationServiceService, private toastService:ToastService, private cd: ChangeDetectorRef, private sessionService: SessionService, private stringHelper: StringHelperService, private tagService :TagService, private modalService: NgbModal, private todoService: TodoService, private router: Router) { }

  // @ViewChild('gmap') gmapElement: any; map: google.maps.Map;

  public text;

  locationError: boolean = false;
  public isProgress : boolean = false;
  geocoder = new google.maps.Geocoder();
  counter = 0;
  isDeletable : boolean = false;
  fileUploadProgress : number = 0;

  public address : string = null;
  private currLat;
  private currLng;
  public addedTags : TagGetModel[] = [];
  public searchedTags : TagGetModel[] = [];
  public description : string = "";
  public untilWhen: string;
  selectedFile : File;


  currentTodoId: number ;


  public ngOnInit(): void {
    let dateResult = new Date(new Date().getTime()+14400000+10800000).toISOString();
    this.untilWhen = this.stringHelper.deleteElement(dateResult, dateResult.length-5, dateResult.length)
  }

  getLocation(){

    if (this.counter >= 1) {
      if (this.stringHelper.isStringNullOrEmpty(this.address)) {
        this.locationError = true;
        this.toastService.writeMessage('danger',"Konumunuz alınamadı. Lütfen konum izinlerini açmayı unutmayın!!.",5);
        this.isProgress = false;
        return;
      }
      return
    }
    this.counter ++;
    this.isProgress = true;
    this.locationService.getPosition().then(pos=>
      {
        if (typeof pos.lat ===  "number" && typeof pos.lng === "number") {
          this.currLat = pos.lat;
          this.currLng = pos.lng;
          this.locationError = false;
        }
        else{
          console.log("Konum alınırken hata");
          this.locationError = true;
        }
      }).then( () => this.geocode(this.currLat.toString(), this.currLng.toString())).then( () => this.Refresher() );

    if (this.locationError) {
      this.toastService.writeMessage('danger',"Konumunuz alınamadı. Lütfen konum izinlerini açmayı unutmayın!!.",5);
    }
  }

  geocode(lt: string, long:string) : void{
    this.geocoder.geocode({ location : {lat: parseFloat(lt),lng: parseFloat(long)} }, (results, status) => {
      if (status == 'OK') {
        this.address = results[0].formatted_address;
        this.isProgress = false;
        this.isDeletable = true;

      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
        this.address = null;
        this.isProgress = false;
      }
    });
  }


  Refresher = () => {
    setTimeout(() => {
      this.getLocation();
    }, 3000);
  };

  public removeAddress(){
    this.address = undefined;
    this.currLat = undefined;
    this.currLng = undefined;
    this.counter = 0;
    this.isDeletable = false;
  }


  addContent(){
    console.log(this.untilWhen);
    if (this.stringHelper.isStringNullOrEmpty(this.description)) {
      this.toastService.writeMessage('danger', "Açıklama alanı en az 5 karakterden oluşmalıdır!!",3);
    }
    else if (new Date(this.untilWhen).getTime() - new Date().getTime() <= 0) {
      this.toastService.writeMessage('danger', "Gerçekleştirme tarihi bugünden önce olamaz.",3);
    }
    else{

      let newTodo : TodoCreateModel = {
        tags : this.getAddedTagsAsStringArray(),
        imageUrl: "",
        UntilWhen: new Date(new Date(this.untilWhen).getTime()+10800000),
        LocationLongitude: this.currLng,
        LocationLatitude : this.currLat,
        Description: this.description,
        CreatorUserId: Number.parseInt(this.sessionService.getSessionID()),
        Address: this.address
      };

      console.log(newTodo);

      this.todoService.Create_Post(newTodo)
        .subscribe( response => {
          let result = <SuccessResultFromTodoUpload>response;
          if (!this.stringHelper.isStringNullOrEmpty(result.message)) {
            this.currentTodoId = Number.parseInt(result.message);
          }

          if (this.selectedFile !== undefined) {
            console.log(this.selectedFile);
            this.uploadImage();
          }
          else{
            this.router.navigate(['']);
            this.toastService.writeMessage("success", "Görev oluşturma başarılı", 3);
          }
        }, error => {
          console.log(error);
        });
    }
  }

  getAddedTagsAsStringArray(): string[]{
    let result = [];
    for (let index = 0; index < this.addedTags.length; index++) {
      result.push(this.addedTags[index].name);
    }
    return result;
  }

  public createTag(tagName: string){
    if (this.stringHelper.isStringNullOrEmpty(tagName)) {
      this.toastService.writeMessage('danger', "Etiket adı boş olamaz!!",2);
    }
    else if (tagName.length < 3) {
      this.toastService.writeMessage('danger', "Etiket adı en az 3 karakterden oluşmalıdır!!",3);
    }
    else{
      let newTag : TagCreateModel = {
        CreatorUserName : this.sessionService.getSessionValue(),
        Name : tagName
      };
      this.tagService.Create_Post(newTag,this.sessionService.getSessionValue())
        .subscribe( response => {
          let _tempTag = {creatorUserName : newTag.CreatorUserName, name: newTag.Name, tagId: 0, createdAt: new Date()};
          this.searchedTags.push(_tempTag);
          this.addedTags.push(_tempTag);
          this.toastService.writeMessage('success',"Etiket oluşturma başarılı.", 3);
        }, error => {
          if (this.stringHelper.Contains(error.error.error, "0035")) {
            this.toastService.writeMessage('danger',"Etiket oluşturulamadı. Etiket zaten mevcut!", 3);
          }
          else{
            this.toastService.writeMessage('danger',"Etiket oluşturma başarısız.", 3);
          }

        });
    }

  }

  crateConfirmationForTag(content, tagInput:HTMLInputElement) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:'md', centered: true}).result.then((result) => {
      if (result==='yes') {
        this.createTag(tagInput.value);
        tagInput.value = "";
      }
      else if ('no') {
        this.toastService.writeMessage('info',"Etiket oluşturma işlemi iptal edildi.", 3);
      }
    }, (reason) => {
      this.toastService.writeMessage('info',"Etiket oluşturma işlemi iptal edildi.", 3);
    });
  }

  public getTags(input: HTMLInputElement){
    this.tagService.GetTagsByFilter_Get(input.value, this.sessionService.getSessionValue())
      .subscribe( response => {
        this.searchedTags = <TagGetModel[]>response;
      }, error => {
        console.log(error.error.error);
      });
  }

  public addTag(tagInput: HTMLInputElement){
    if (this._checkIfTagAlreadyAdded(tagInput.value)) {
      this.toastService.writeMessage('warning', "Bu etiket zaten eklendi.", 2);
      return;
    }

    if (this.stringHelper.Contains(tagInput.value, " ")) {
      this.toastService.writeMessage('warning', "Etiket isminde boşluk olamaz.", 2);
      return;
    }

    for (let index = 0; index < this.searchedTags.length; index++) {
      if (this.searchedTags[index].name === tagInput.value) {
        this.addedTags.push(this.searchedTags[index]);
        tagInput.value = "";
        this.searchedTags = [];
        return;
      }
    }
  }

  _checkIfTagAlreadyAdded(tagName: string){
    for (let index = 0; index < this.addedTags.length; index++) {
      if (this.addedTags[index].name === tagName) {
        return true;
      }
    }
    return false;
  }

  public deleteTag(tagName: string){
    for (let index = 0; index < this.addedTags.length; index++) {
      if (this.addedTags[index].name === tagName) {
        this.addedTags.splice(index,1);
      }
    }
  }

  // TODO- DOSYANIN UZANTISINI KONTROL ET VE TEK BİR DOSYA GİRDİSİ OLSUN
  onFileChanged(event){

    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }

  startPorgressWithModal(modal){
    if (this.selectedFile === null || typeof this.selectedFile === 'undefined') {
      return;
    }
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title', size:'md', centered: true}).result.then((result) => {

    }, (reason) => {

    });
  }


  uploadImage(){
    if (typeof this.currentTodoId === 'undefined' || this.currentTodoId === null ) {
      this.toastService.writeMessage("danger", "Dosya yüklenemedi.", 3);
      return
    }
    else{
      this.todoService.ImageUpload_Post(this.currentTodoId, this.sessionService.getSessionValue(), this.selectedFile)
        .subscribe( event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress = Math.round(100 * event.loaded / event.total)
          }
          else if(event.type === HttpEventType.Response){
            this.modalService.dismissAll();
            this.toastService.writeMessage("success", "Görev paylaşıldı", 3);
            this.router.navigate(['']);
          }
        });
    }
  }

}
