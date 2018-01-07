import { ControlContainer } from "@angular/forms/src/directives/control_container";
import { FormGroup } from "@angular/forms/src/model";

export class StartEndDateValidation {
  static dates(startDate: string, endDate: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let startDatetime: Date = group.controls[startDate].value;
      let endDatetime: Date = group.controls[endDate].value;

      if(!(endDatetime && startDatetime) || endDatetime.getTime() < startDatetime.getTime()) {
        return {
          invalidDateRange: true
        };
      }
    }
  }
}