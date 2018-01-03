import { ControlContainer } from "@angular/forms/src/directives/control_container";

export class RegexValidation {
  static regex(pattern: RegExp): Function {
    return (control: ControlContainer): {[key: string]: any} => {
      return !control.value || control.value.match(pattern) ? null : { pattern: true };
    };
  }
}