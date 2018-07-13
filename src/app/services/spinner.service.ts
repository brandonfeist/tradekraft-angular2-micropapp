import { SpinnerComponent } from './../spinner/spinner/spinner.component';
import { IndexSpinnerComponent } from './../spinner/index-spinner/index-spinner.component';
import { Injectable, Component } from '@angular/core';

@Injectable()
export class SpinnerService {
  private spinnerCache = new Set<any>();

  register(spinner: SpinnerComponent | IndexSpinnerComponent): void {
    this.spinnerCache.add(spinner);
  }

  unregister(spinnerToRemove: SpinnerComponent | IndexSpinnerComponent) {
    this.spinnerCache.forEach(spinner => {
      if(spinner = spinnerToRemove) {
        this.spinnerCache.delete(spinner);
      }
    });
  }

  show(spinnerName: string): void {
    this.spinnerCache.forEach(spinner => {
      if(spinner.name === spinnerName) {
        spinner.loading = true;
      }
    });
  }

  hide(spinnerName: string): void {
    this.spinnerCache.forEach(spinner => {
      if(spinner.name === spinnerName) {
        spinner.loading = false;
      }
    });
  }

  showGroup(spinnerGroup: string): void {
    this.spinnerCache.forEach(spinner => {
      if(spinner.group === spinnerGroup) {
        spinner.loading = true;
      }
    });
  }

  hideGroup(spinnerGroup: string): void {
    this.spinnerCache.forEach(spinner => {
      if(spinner.group === spinnerGroup) {
        spinner.loading = false;
      }
    });
  }

  showAll(): void {
    this.spinnerCache.forEach(spinner => spinner.loading = true);
  }

  hideAll(): void {
    this.spinnerCache.forEach(spinner => spinner.loading = false);
  }

  isShowing(spinnerName: string): boolean | undefined {
    this.spinnerCache.forEach(spinner => {
      if(spinner.name === spinnerName) {
        return spinner.loading;
      }
    });

    return undefined;
  }
}