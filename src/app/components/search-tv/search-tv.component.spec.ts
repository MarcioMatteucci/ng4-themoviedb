import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTvComponent } from './search-tv.component';

describe('SearchTvComponent', () => {
  let component: SearchTvComponent;
  let fixture: ComponentFixture<SearchTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
