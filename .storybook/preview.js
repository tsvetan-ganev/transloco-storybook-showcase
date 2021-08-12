import { setCompodocJson } from "@storybook/addon-docs/angular";
import { moduleMetadata } from "@storybook/angular";
import docJson from "../documentation.json";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
} from "./../src/app/transloco/supported-languages";
import { TranslocoStorybookModule } from "./../src/app/transloco/transloco-storybook.module";

setCompodocJson(docJson);

export const parameters = {
  docs: { inlineStories: true },
};

export const decorators = [
  // declares Angular modules which will be available for all stories
  moduleMetadata({
    imports: [TranslocoStorybookModule],
  }),
];

export const globalTypes = {
  // add a dropdown menu in the Storybook UI toolbar
  language: {
    name: "Language",
    description: `Choose a language`,
    defaultValue: DEFAULT_LANGUAGE.code,
    toolbar: {
      icon: "globe",
      items: SUPPORTED_LANGUAGES.map((language) => ({
        value: language.code,
        right: language.icon,
        title: language.title,
      })),
    },
  },
};
