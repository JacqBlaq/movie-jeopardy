import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Size } from 'src/app/models/size.type';
import { UtilsService as Utils } from 'src/app/services/utils.service';

@Component({
  selector: 'jeo-avatar',
  template: `
	<div class="avatar"
		[style.background]="avatarUrl"
		(click)="fileUpload.click()">

		<input #fileUpload type="file" accept="image/*"
			style="display: none;"
			(change)="onUploadAvatar($event)">

		<ng-content select="jeo-avatar-actions"></ng-content>

		<mat-icon *ngIf="!avatarUrl"
			class="avatar-default">person</mat-icon>
	</div>
  `,
  host: {
	'[class.small]': 'size === "small"',
	'[class.medium]': 'size === "medium"',
	'[class.big]': 'size === "big"'
  }
})
export class JeoAvatarComponent implements OnChanges {

	@Input() size: Size = 'small';
	@Input() avatarUrl?: string = '#ffffff';

	@Output() onAvatarChange: EventEmitter<string> = new EventEmitter<string>();


	ngOnChanges(changes: SimpleChanges): void {
		const avatarChange = changes['avatarUrl'];

		if (Utils.isValidChange(avatarChange)) {
			this.avatarUrl = `center / cover url(${avatarChange.currentValue})`;
		}
	}

	ngOnInit(): void {
		console.log(this.size)
	}

	/**
	 * Uploads an image to be used as player's avatar.
	 * @param event - Upload event.
	 */
	onUploadAvatar(event: Event | any): void {
		const pattern = /image-*/;
		const reader = new FileReader();
		const file: File = event.target?.files[0];

		if (!file.type.match(pattern)) {
			alert('invalid format');
			return;
		}

		reader.readAsDataURL(file);
		reader.onload = (): void => {
			const base64 = reader.result as string;
			this.onAvatarChange.emit(base64);
		};
	}

}
