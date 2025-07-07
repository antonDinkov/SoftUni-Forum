import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePosts } from './side-posts';

describe('SidePosts', () => {
  let component: SidePosts;
  let fixture: ComponentFixture<SidePosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidePosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
