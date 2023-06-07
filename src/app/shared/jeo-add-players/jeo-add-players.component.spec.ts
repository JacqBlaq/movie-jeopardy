import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeoAddPlayersComponent } from './jeo-add-players.component';

describe('JeoAddPlayersComponent', () => {
  let component: JeoAddPlayersComponent;
  let fixture: ComponentFixture<JeoAddPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeoAddPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JeoAddPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/**
 * #onAddPlayer() should add 1 new player to list of players.
 */

/**
 * #onRemovePlayer() should remove the player that matches #id
 * from list of players.
 */

