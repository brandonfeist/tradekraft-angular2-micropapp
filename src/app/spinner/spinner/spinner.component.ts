import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnInit {
  private isLoading: boolean = false;

  @Input() name: string;
  @Input() group: string;
  @Input()
  get loading(): boolean {
    return this.isLoading;
  }

  @Output() loadingChange = new EventEmitter();

  set loading(val: boolean) {
    this.isLoading = val;
    this.loadingChange.emit(this.isLoading);
  }

  constructor(private spinnerService: SpinnerService) {}

  ngOnDestroy(): void {
    this.spinnerService.unregister(this);
  }

  ngOnInit(): void {
    if(!this.name) {
      throw new Error("Spinner must have a 'name' attribute.");
    }

    this.spinnerService.register(this);
  }
}