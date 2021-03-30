import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from "ngx-bootstrap/modal";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileTodosComponent } from './profile-todos/profile-todos.component';
import { TestrepoComponent } from './testrepo/testrepo.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeTopUsersComponent } from './home-top-users/home-top-users.component';
import { HomeTodosComponent } from './home-todos/home-todos.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { AlertComponent } from './alert/alert.component';
import { MessagingComponent } from './messaging/messaging.component';
import { MessagingChatsComponent } from './messaging-chats/messaging-chats.component';
import { MessagingTextingComponent } from './messaging-texting/messaging-texting.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordReminderComponent } from './password-reminder/password-reminder.component';
import { PasswordReminderMailComponent } from './password-reminder-mail/password-reminder-mail.component';
import { PasswordReminderRepassComponent } from './password-reminder-repass/password-reminder-repass.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { SettingsPanelComponent } from './settings-panel/settings-panel.component';
import { SettingsPanelProfileComponent } from './settings-panel-profile/settings-panel-profile.component';
import { SettingsPanelInterestComponent } from './settings-panel-interest/settings-panel-interest.component';
import { SettingsPanelPasswordComponent } from './settings-panel-password/settings-panel-password.component';
import { SettingsPanelSecurityComponent } from './settings-panel-security/settings-panel-security.component';
import { ContentAddComponent } from './content-add/content-add.component';
import { NotificationComponent } from './notification/notification.component';
import { SearchComponent } from './search/search.component';
import { TagComponent } from './tag/tag.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { ProfileCardListComponent } from './profile-card-list/profile-card-list.component';
import { ProfileSecretBannerComponent } from './profile-secret-banner/profile-secret-banner.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostComponent } from './post/post.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProfileHeaderComponent,
    ProfileContentComponent,
    NavbarComponent,
    ProfileTodosComponent,
    TestrepoComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    HomeTopUsersComponent,
    HomeTodosComponent,
    PostCommentComponent,
    AlertComponent,
    MessagingComponent,
    MessagingChatsComponent,
    MessagingTextingComponent,
    LoginComponent,
    SignupComponent,
    PasswordReminderComponent,
    PasswordReminderMailComponent,
    PasswordReminderRepassComponent,
    SettingsComponent,
    SettingsMenuComponent,
    SettingsPanelComponent,
    SettingsPanelProfileComponent,
    SettingsPanelInterestComponent,
    SettingsPanelPasswordComponent,
    SettingsPanelSecurityComponent,
    ContentAddComponent,
    NotificationComponent,
    SearchComponent,
    TagComponent,
    TagListComponent,
    ProfileCardListComponent,
    ProfileSecretBannerComponent,
    PostDetailComponent,
    PostEditComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
