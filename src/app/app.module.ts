import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    PasswordReminderRepassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
