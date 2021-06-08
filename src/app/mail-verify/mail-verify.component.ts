import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailupdateService } from '../services/BackendServices/mailupdate.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-mail-verify',
  templateUrl: './mail-verify.component.html',
  styleUrls: ['./mail-verify.component.css']
})
export class MailVerifyComponent implements OnInit {

  constructor(private mailService: MailupdateService, private route: ActivatedRoute, private router: Router, private stringService: StringHelperService, private toast: ToastService) { }

  ngOnInit(): void {
    this.updateMailAddress();
  }

  updateMailAddress(){
    this.mailService.Update_Get(this.getToken())
      .subscribe( res => {
        let result = <{message:string}>res;
        if (this.stringService.Contains(result.message, "0055")) {
          this.toast.writeMessage('success', "Mail adresin güncellendi. Yönlendirileceksin.", 4);
          setTimeout( () =>{
            this.router.navigate(['']);
          }, 5000);
        }
        else{
          this.router.navigate(['/404']);
        }
      }, err =>{
        this.router.navigate(['/404']);
      });
  }

  public getToken() : string {
    return this.route.snapshot.paramMap.get("token");
  }

}
