import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBtnEventComponent } from './delete-btn-event.component';

describe('DeleteBtnEventComponent', () => {
  let component: DeleteBtnEventComponent;
  let fixture: ComponentFixture<DeleteBtnEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBtnEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBtnEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
