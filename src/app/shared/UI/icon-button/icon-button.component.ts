import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() variation: string | undefined = 'primary'
  @Input() type: string | undefined
  @Input() disabled: boolean | undefined = false
  @Input() icon!: string
}
