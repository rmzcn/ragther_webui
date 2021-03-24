import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordReminderRepassComponent } from './password-reminder-repass.component';

describe('PasswordReminderRepassComponent', () => {
  let component: PasswordReminderRepassComponent;
  let fixture: ComponentFixture<PasswordReminderRepassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordReminderRepassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordReminderRepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
