import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { EvilCorpStatusBadgeComponent } from './evil-corp-status-badge/evil-corp-status-badge.component';

@NgModule({
  declarations: [EvilCorpStatusBadgeComponent],
  exports: [EvilCorpStatusBadgeComponent],
  imports: [CommonModule, TranslocoModule],
})
export class ComponentsModule {}
