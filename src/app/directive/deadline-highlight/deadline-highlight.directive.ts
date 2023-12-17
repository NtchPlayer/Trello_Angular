import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDeadlineHighlight]'
})
export class DeadlineHighlightDirective {
  @Input('appDeadlineHighlight') deadline!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.highlightTaskBasedOnDeadline();
  }

  private highlightTaskBasedOnDeadline() {
    if (this.deadline) {
      const deadlineDate = new Date(this.deadline);
      const currentDate = new Date();
      const daysUntilDeadline = Math.floor((deadlineDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

      if (daysUntilDeadline > 10) {
        this.applyHighlightStyle('4px solid green'); // Bordure verte
      }
      else if (daysUntilDeadline <= 10 && daysUntilDeadline > 5) {
        this.applyHighlightStyle('4px solid orange'); // Bordure jaune
      } else if (daysUntilDeadline <= 5) {
        this.applyHighlightStyle('4px solid red'); // Bordure rouge
      }
    }
  }

  private applyHighlightStyle(borderStyle: string) {
    this.renderer.setStyle(this.el.nativeElement, 'border-left', borderStyle);
  }
}
