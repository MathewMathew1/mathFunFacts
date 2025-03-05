import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactListComponent } from './fact-list.component';

describe('FactListComponent', () => {
  let component: FactListComponent;
  let fixture: ComponentFixture<FactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
