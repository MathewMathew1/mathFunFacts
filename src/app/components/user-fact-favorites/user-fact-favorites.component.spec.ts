import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFactFavoritesComponent } from './user-fact-favorites.component';

describe('UserFactFavoritesComponent', () => {
  let component: UserFactFavoritesComponent;
  let fixture: ComponentFixture<UserFactFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFactFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFactFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
