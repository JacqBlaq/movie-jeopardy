import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeoWinnerModalComponent } from './jeo-winner-modal.component';

describe('JeoWinnerModalComponent', () => {
  let component: JeoWinnerModalComponent;
  let fixture: ComponentFixture<JeoWinnerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeoWinnerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JeoWinnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
