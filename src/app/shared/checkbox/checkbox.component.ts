import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() checked!: boolean;
  @Input() name!: string;

  @Output() checkedChange = new EventEmitter<boolean>();
}
