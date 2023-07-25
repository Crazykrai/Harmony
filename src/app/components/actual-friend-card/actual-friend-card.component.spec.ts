import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualFriendCardComponent } from './actual-friend-card.component';

describe('ActualFriendCardComponent', () => {
  let component: ActualFriendCardComponent;
  let fixture: ComponentFixture<ActualFriendCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualFriendCardComponent]
    });
    fixture = TestBed.createComponent(ActualFriendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
