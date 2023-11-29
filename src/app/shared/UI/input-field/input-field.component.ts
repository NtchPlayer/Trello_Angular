import { Component, Input, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldComponent),
    multi: true
  }]
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() name!: string
  @Input() label: string|undefined
  @Input() placeholder!: string
  @Input() type: string|undefined = 'text'

  inputValue: string = ''

  writeValue(value: any) {
    if (value !== undefined) {
      this.inputValue = value
    }
  }

  propagateChange = (_: any) => {}

  registerOnChange(fn: any) {
    this.propagateChange = fn
  }

  registerOnTouched() {}
}
