import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';

export interface DialogData {
  message: string,
  buttonText: {
    ok: string,
    cancel: string,
  }
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose, MatDialogTitle],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
