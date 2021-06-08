import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/BackendServices/user.service';
import { SessionService } from '../services/BrowserServices/session.service';
import { StringHelperService } from '../services/HelperServices/string-helper.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'password-reminder-mail',
  templateUrl: './password-reminder-mail.component.html',
  styleUrls: ['./password-reminder-mail.component.css']
})
export class PasswordReminderMailComponent implements OnInit {

  constructor(private userService: UserService, private toast: ToastService, private sessionService: SessionService, private stringHelper: StringHelperService, private router: Router) { }

  isMailNotExist : boolean = false;
  successProccess: boolean = false;
  loading = false;


  ngOnInit(): void {

  }

  repass(input: HTMLInputElement){
    this.loading = true;
    this.userService.ForgetPassword_Get(input.value)
      .subscribe( res => {

        let result = <{result: string}>res;
        console.log(res);
        if (this.stringHelper.Contains(result.result,"0060")) {
          this.loading = false;
          input.disabled = true;
          this.isMailNotExist = false;
          this.successProccess = true;
          this.toast.writeMessage("success", "Mail adresine şifren başarı ile gönderildi. Yönlendiriiyorsun...", 3);
          this.sessionService.deleteSession();
          setInterval( () =>{
            this.router.navigate(['/login']);
          }, 5000 );
        }
      }, err => {
        this.loading = false;
        this.successProccess = false;
        this.isMailNotExist = true;
        this.toast.writeMessage("danger", "Mail adresini bulamadık", 3);
      });
  }

}
