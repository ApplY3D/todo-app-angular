import { Meta } from '@storybook/angular/types-6-0';

import { AlertComponent } from './alert.component';

export default {
  title: 'Components/Alert',
  component: AlertComponent,
} as Meta;

export const Primary = () => ({
  props: {
    alert: { text: 'Alert', type: 'danger' },
  },
});
