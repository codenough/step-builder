import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component } from '@angular/core';

export interface IDialogData<T> {
  value?: T;
  header?: string;
  okButton?: string;
  cancelButton?: string;
}

@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings-dialog.component.html',
  styleUrls: ['settings-dialog.component.scss']
})
export class SettingsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData<string>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
