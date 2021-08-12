import { HttpClientModule } from '@angular/common/http';
import { forceReRender, Story } from '@storybook/angular';
import {
  TRANSLOCO_LOADER,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
  TranslocoService,
} from '@ngneat/transloco';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './supported-languages';
import { TranslocoHttpLoader } from './http-loader';

let translocoServiceInstance: TranslocoService | null = null;

export function translocoStorybookInitializer(
  translocoService: TranslocoService
) {
  return () => {
    const subscription = translocoService.langChanges$
      .pipe(
        distinctUntilChanged(),
        tap(() => forceReRender())
      )
      .subscribe();

    translocoServiceInstance = translocoService;

    const onDestroyCb = translocoService.ngOnDestroy.bind(translocoService);
    translocoService.ngOnDestroy = () => {
      onDestroyCb();
      subscription?.unsubscribe();
    };
  };
}

/**
 * This module provides translations for Storybook.
 * It must not be imported outside of Storybook stories.
 *
 * @private
 */
@NgModule({
  exports: [TranslocoModule],
  imports: [HttpClientModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: SUPPORTED_LANGUAGES.map((l) => l.code),
        defaultLang: DEFAULT_LANGUAGE.code,
        reRenderOnLangChange: true,
        missingHandler: {
          logMissingKey: false,
        },
        fallbackLang: DEFAULT_LANGUAGE.code,
        prodMode: false,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    {
      provide: APP_INITIALIZER,
      useFactory: translocoStorybookInitializer,
      multi: true,
      deps: [TranslocoService],
    },
  ],
})
export class TranslocoStorybookModule {}

export const TranslocoStory: Story = (args, { globals, ...rest }) => {
  if (globals.language) {
    translocoServiceInstance?.setActiveLang(globals.language);
  }

  return {
    globals,
    props: {
      ...args,
    },
    ...rest,
  };
};
