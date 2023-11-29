import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variation: string | undefined = 'primary'
  @Input() type: string | undefined
  @Input() disabled: boolean | undefined = false
  @Input() iconStart: string | undefined
}
