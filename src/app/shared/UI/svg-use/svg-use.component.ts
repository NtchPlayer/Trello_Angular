import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-use',
  templateUrl: './svg-use.component.html',
  styleUrls: ['./svg-use.component.scss']
})
export class SvgUseComponent {
  @Input() href!: string;
}
