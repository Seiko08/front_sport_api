import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrganisereventComponent } from './list-organiserevent.component';

describe('ListOrganisereventComponent', () => {
  let component: ListOrganisereventComponent;
  let fixture: ComponentFixture<ListOrganisereventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOrganisereventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrganisereventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
