import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterSubscriptionComponent } from './newsletter-subscription.component';

describe('NewsletterSubscriptionComponent', () => {
  let component: NewsletterSubscriptionComponent;
  let fixture: ComponentFixture<NewsletterSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsletterSubscriptionComponent]
    });
    fixture = TestBed.createComponent(NewsletterSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
