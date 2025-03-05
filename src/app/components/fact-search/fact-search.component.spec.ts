import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactSearchComponent } from './fact-search.component';

describe('FactSearchComponent', () => {
  let component: FactSearchComponent;
  let fixture: ComponentFixture<FactSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
