import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';

describe('PlayerService', () => {
  let service: PlayerService;
  let playerServiceStub: Partial<PlayerService>;

  const mockPlayers = [
    { id: 1, name: 'player1'},
    { id: 2, name: 'player2'}
  ];

  const mockActivePlayer = {
    ...mockPlayers[0],
    index: 0
  };


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerService);

    // Create mock localStorage
    let store: { [key: string]: any } = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

//   it('#getPlayers(): should return an array with 1 player', () => {
//     expect(service.getPlayers().length).toBe(1);
//     expect(service.getPlayers()[0].id).toBe(1);
//   });

//   it('#getPlayers(): should return 2 players after adding a new player', () => {
//     service.onAddPlayer();
//     expect(service.getPlayers().length).toBe(2);
//   });

//   it('#getPlayers(): should return 3 players after removing a player', () => {
//     // Add 3 new players so list is now 4
//     service.onAddPlayer();
//     service.onAddPlayer();
//     service.onAddPlayer();

//     // Remove a player with #id 2
//     service.onRemovePlayer(2);

//     expect(service.getPlayers().length).toBe(3);
//     expect(service.getPlayers().find(p => p.id == 2)).toBeNull();
//   });

//   it('#getActivePlayerId(): should return the number 1', () => {
//     expect(service.getActivePlayerId()).toBe(1);
//   });

//   it('#getActivePlayerById(): should return player at index 0', () => {
//     service.onAddPlayer();
//     expect(service.getActivePlayerById().id).toBe(0);
//   });

  // it('#getActivePlayerById(): should return player at index 2 after passing turn to next player', () => {
  //   service.onAddPlayer();
  //   expect(service.getActivePlayerById().index).toBe(0);
  // });


  // #onScoreIncrease(): should return 0 score when points awarded is 0
  // #onScoreIncrease(): should return 200 score when points award is 200
  // #onScoreIncrease(): should return 600 score when points added to 200 is 400
  // #onScoreIncrease(): should return 0 score when not the player awarded the points.

  // #onAvatarUpload(): should return null #avatar value when #src is empty string
  // #onAvatarUpload(): should return #avatar value when #src is not empty string
  // #onAvatarUpload(): should return null #avatar value when not player whose avatar is being updated

  // #onNameChange(): should return null #name value when #change is empty string
  // #onNameChange(): should return #name value when #change is not empty string
  // #onNameChange(): should return #name value when #change is not over 20 characters length
    // #onNameChange(): should return #name value of length 20 chars when #change is over 20 characters length
  // #onNameChange(): should return null #name value when not player whose #name is being updated

  // #onScoresReset(): should return 0 for all player scores when no points have been awarded
  // #onScoresReset(): should return 0 for all player scores when points have been awarded

  // #onGameExit(): should reset players list to 1 default player
  // #onGameExit(): should reset players list to 1 default player when there are 3 players

});




// it('#clicked() should set #message to "is on"', () => {
//   const comp = new PlayerService();
//   expect(comp.message)
//     .withContext('off at first')
//     .toMatch(/is off/i);
//   comp.clicked();
//   expect(comp.message)
//     .withContext('on after clicked')
//     .toMatch(/is on/i);
// });
