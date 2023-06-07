import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JeoGameboardComponent } from './jeo-gameboard.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerService } from '../services/player/player.service';

describe('JeoGameboardComponent', () => {
	let component: JeoGameboardComponent;
	let fixture: ComponentFixture<JeoGameboardComponent>;
	let matDialogStub: jasmine.SpyObj<MatDialog>;
	let playerServiceStub: Partial<PlayerService>;

	beforeEach(async () => {
		// stub MatDialog for test purposes
		matDialogStub = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

		// stub UserService for test purposes
		const mockPlayers = [
			{ id: 1, name: 'player1' },
			{ id: 2, name: 'player2' },
		];
		const activePlayer = {
			...mockPlayers[0],
			index: 1,
		};
		playerServiceStub = {
			getPlayers: () => mockPlayers,
			getPlayerSettings: () => mockPlayers,
			getActivePlayerId: () => 1,
			getActivePlayerById: () => activePlayer,
		};
		await TestBed.configureTestingModule({
			declarations: [JeoGameboardComponent],
			providers: [
				{ provide: MatDialog, useValue: matDialogStub },
				{ provide: PlayerService, useValue: playerServiceStub },
				{ provide: MatDialog, useValue: matDialogStub },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(JeoGameboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
