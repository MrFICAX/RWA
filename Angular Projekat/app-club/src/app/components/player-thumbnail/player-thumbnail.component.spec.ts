import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerThumbnailComponent } from './player-thumbnail.component';

describe('PlayerThumbnailComponent', () => {
  let component: PlayerThumbnailComponent;
  let fixture: ComponentFixture<PlayerThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
