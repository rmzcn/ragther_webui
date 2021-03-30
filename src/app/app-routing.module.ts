import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentAddComponent } from './content-add/content-add.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessagingComponent } from './messaging/messaging.component';
import { NotificationComponent } from './notification/notification.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PasswordReminderComponent } from './password-reminder/password-reminder.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SettingsPanelInterestComponent } from './settings-panel-interest/settings-panel-interest.component';
import { SettingsPanelPasswordComponent } from './settings-panel-password/settings-panel-password.component';
import { SettingsPanelProfileComponent } from './settings-panel-profile/settings-panel-profile.component';
import { SettingsPanelSecurityComponent } from './settings-panel-security/settings-panel-security.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: 'chat', component: MessagingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'forgetpass', component: PasswordReminderComponent},
  {path: 'notifications', component: NotificationComponent},
  {path: 'addcontent', component: ContentAddComponent},
  {path: 'search', component: SearchComponent},

  {
    path: 'todo/:postID',
    component: PostComponent,
    children: [
      {path: '', component: PostDetailComponent, pathMatch: 'full'},
      {path: 'edit', component: PostEditComponent},
      {path: 'detail', component: PostDetailComponent}
    ]
  },

  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {path: '', component: SettingsPanelProfileComponent, pathMatch: 'full'},
      {path: 'profile', component: SettingsPanelProfileComponent},
      {path: 'interest', component: SettingsPanelInterestComponent},
      {path: 'password', component: SettingsPanelPasswordComponent},
      {path: 'security', component: SettingsPanelSecurityComponent}
    ]
  },
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
