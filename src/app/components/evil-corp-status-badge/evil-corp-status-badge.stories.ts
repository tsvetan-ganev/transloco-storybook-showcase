import { Meta } from '@storybook/angular';
import { TranslocoStory } from '../../transloco/transloco-storybook.module';
import { EvilCorpStatusBadgeComponent } from './evil-corp-status-badge.component';

export default {
  title: 'Components/EvilCorpStatusBadge',
  component: EvilCorpStatusBadgeComponent,
} as Meta;

export const Processing = TranslocoStory.bind({});
Processing.args = {
  status: 'processing',
};

export const Success = TranslocoStory.bind({});
Success.args = {
  status: 'success',
};

export const Error = TranslocoStory.bind({});
Error.args = {
  status: 'error',
};
