import { SnackbarService } from 'app/services/snackbar.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'newsletter-dialog',
  templateUrl: 'newsletter.component.html',
})
export class NewsletterDialog {

  private newsletterForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewsletterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackbarService: SnackbarService,
      private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createNewsletterForm();
  }

  private createNewsletterForm() {
    this.newsletterForm = this.formBuilder.group({
      email: '',
    });
  }

  onSubmit() {
    this.snackbarService.openSnackbar("Thanks for signing up for our newsletter!");
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}