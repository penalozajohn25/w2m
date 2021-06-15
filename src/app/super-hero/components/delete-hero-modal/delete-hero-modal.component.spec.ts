import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHeroModalComponent } from './delete-hero-modal.component';

describe('DeleteHeroModalComponent', () => {
  let component: DeleteHeroModalComponent;
  let fixture: ComponentFixture<DeleteHeroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteHeroModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHeroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
