// import { action } from '@storybook/addon-actions';
import { number, select, withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { PositionComponent } from '.';
import { Plans } from '../../../engine/resources/Maps';

const stories = storiesOf('Infos/Position', module);

const earth = Plans.find(p => p.id === 'earth');
const hell = Plans.find(p => p.id === 'hell');
const heaven = Plans.find(p => p.id === 'heaven');

stories.addDecorator(withKnobs);

stories.add('basic Position', () => <PositionComponent
  position={
    {
      plan: select(
        'Plan',
        {
          earth,
          hell,
          heaven,
        },
        earth),
      x: number('Position X', 0),
      y: number('Position Y', 0),
    }}
/>);

stories.add('Position is empty', () => <PositionComponent />);
