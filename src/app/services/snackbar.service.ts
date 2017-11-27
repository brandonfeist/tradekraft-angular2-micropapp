import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackbarService {
  
  private DEFAULT_SNACKBAR_DURATION: number = 2000;

  constructor(private snackBar: MatSnackBar) {}

  openSnackbar(message: string, action?: string, duration?: number) {
    if(!duration) {
      duration = this.DEFAULT_SNACKBAR_DURATION;
    }

    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
