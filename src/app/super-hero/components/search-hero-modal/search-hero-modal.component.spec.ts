import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHeroModalComponent } from './search-hero-modal.component';

describe('SearchHeroModalComponent', () => {
  let component: SearchHeroModalComponent;
  let fixture: ComponentFixture<SearchHeroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHeroModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
