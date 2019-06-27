// import { action } from '@storybook/addon-actions';
import { number, text, withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ScreenNameComponent } from '.';

const stories = storiesOf('Infos/ScreenName', module);

stories.addDecorator(withKnobs);

stories.add('basic ScreenName', () => (
  <ScreenNameComponent
    character={{
      name: text('Pseudo', 'Story', 'Perso'),
      mat: number('Matricule', 1, { range: true, min: 1, max: 99999, step: 1 }, 'Perso'),
      grade: {
        major: number('Grade Major', 0, { range: true, min: 0, max: 4, step: 1 }, 'Grade'),
        minor: number('Grade Minor', 1, { range: true, min: 1, max: 5, step: 1 }, 'Grade'),
      },
    }}
  />
));
