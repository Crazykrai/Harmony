import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationCardComponent } from './recommendation-card.component';

describe('RecommendationCardComponent', () => {
  let component: RecommendationCardComponent;
  let fixture: ComponentFixture<RecommendationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationCardComponent]
    });
    fixture = TestBed.createComponent(RecommendationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
