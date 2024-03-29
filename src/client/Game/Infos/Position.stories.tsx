import { number, select, withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { PositionComponent } from '.';
// import { action } from '@storybook/addon-actions';
import { Plans } from '../../../engine/resources/Maps';

const stories = storiesOf('Infos/Position', module);

const althian = Plans.althian.id;
const ciferis = Plans.ciferis.id;
const celestia = Plans.celestia.id;

stories.addDecorator(withKnobs);

stories.add('basic Position', () => (
  <PositionComponent
    character={{
      coord: {
        plan: select(
          'Plan',
          {
            althian,
            ciferis,
            celestia,
          },
          althian),
        x: number('Position X', 0),
        y: number('Position Y', 0),
      },
    }}
  />
));

stories.add('Position is empty', () => <PositionComponent character={{}} />);
