import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordReminderMailComponent } from './password-reminder-mail.component';

describe('PasswordReminderMailComponent', () => {
  let component: PasswordReminderMailComponent;
  let fixture: ComponentFixture<PasswordReminderMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordReminderMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordReminderMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
