import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from 'src/app/pipe/translate.pipe';

@Directive({
  selector: '[appTooltip]',
  providers: [DatePipe, TranslatePipe]
})
export class TooltipDirective {
  @Input('appTooltip') task: any;

  private tooltipElement: HTMLElement | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private datePipe: DatePipe,
    private translatePipe: TranslatePipe // Inject TranslatePipe
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }

  private showTooltip() {
    if (!this.tooltipElement && this.task) {
      this.tooltipElement = this.renderer.createElement('div');
      this.renderer.addClass(this.tooltipElement, 'tooltip');

      const formattedDate = this.datePipe.transform(this.task.deadline, 'dd/MM/yyyy');
      const assignedUsersCount = this.task.userId_assigned ? this.task.userId_assigned.length : 0;

      const translatedTags = this.task.tags ? this.task.tags.map((tag: string) => this.translatePipe.transform(tag)) : [];

      const content = `
        <div><strong>Deadline:</strong> ${formattedDate}</div>
        <div><strong>Tags:</strong> ${translatedTags.join(', ')}</div>
        <div>${assignedUsersCount} utilisateur${assignedUsersCount !== 1 ? 's' : ''} sur cette tâche</div>
      `;

      if (this.tooltipElement) {
        this.renderer.setProperty(this.tooltipElement, 'innerHTML', content);
        this.renderer.appendChild(document.body, this.tooltipElement);

        const elRect = this.el.nativeElement.getBoundingClientRect();
        const tooltipRect = this.tooltipElement.getBoundingClientRect();

        const top = elRect.top - tooltipRect.height - 5;
        const left = elRect.left + (elRect.width - tooltipRect.width) / 2;

        this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
      }
    }
  }
}