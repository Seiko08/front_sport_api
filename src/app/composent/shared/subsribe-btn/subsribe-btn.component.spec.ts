import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsribeBtnComponent } from './subsribe-btn.component';

describe('SubsribeBtnComponent', () => {
  let component: SubsribeBtnComponent;
  let fixture: ComponentFixture<SubsribeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubsribeBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsribeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
