import { SnackbarService } from 'app/services/snackbar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Release } from 'app/model/release';

import * as _ from "lodash";

@Component({
  selector: 'share-release-dialog',
  templateUrl: 'share-release.component.html',
})
export class ShareReleaseDialog {
  private release: Release;

  constructor(public dialogRef: MatDialogRef<ShareReleaseDialog>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.release = this.data.release;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}