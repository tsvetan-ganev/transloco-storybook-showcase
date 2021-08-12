import {
  TRANSLOCO_LOADER,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './supported-languages';
import { TranslocoHttpLoader } from './http-loader';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: SUPPORTED_LANGUAGES.map((l) => l.code),
        defaultLang: DEFAULT_LANGUAGE.code,
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
