import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardListComponent } from './profile-card-list.component';

describe('ProfileCardListComponent', () => {
  let component: ProfileCardListComponent;
  let fixture: ComponentFixture<ProfileCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
