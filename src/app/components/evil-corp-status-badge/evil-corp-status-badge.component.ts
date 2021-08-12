import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'evil-corp-status-badge',
  template: `
    <ng-container *transloco="let t">
      {{ t('status.' + status) }}
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        justify-content: center;
        border-radius: 4px;
        padding: 4px 8px;
        height: 20px;
        min-width: 100px;
        color: white;
        font-size: 0.875rem;
        font-weight: 500;
        font-family: -apple-system, 'Segoe UI', Roboto, Ubuntu, sans-serif;
        user-select: none;
      }
      :host[data-status='processing'] {
        background-color: #2672c3;
      }
      :host[data-status='success'] {
        background-color: #158e15;
      }
      :host[data-status='error'] {
        background-color: #d22222;
      }
    `,
  ],
})
export class EvilCorpStatusBadgeComponent {
  @HostBinding('attr.data-status')
  @Input()
  status: 'processing' | 'success' | 'error' = 'processing';
}
