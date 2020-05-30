import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareThisComponent } from './share-this.component';

describe('ShareThisComponent', () => {
  let component: ShareThisComponent;
  let fixture: ComponentFixture<ShareThisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareThisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
