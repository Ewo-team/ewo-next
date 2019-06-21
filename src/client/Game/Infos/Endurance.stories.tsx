import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs/react';

import { EnduranceComponent } from '.';

const stories = storiesOf('Infos/Endurance', module);

stories.addDecorator(withKnobs);

stories.add('basic Endurance', () => <EnduranceComponent
    minute={number('Minute', 0, { range: true, min: 0, max: 59, step: 1 })}
/>);

stories.add('Endurance is full', () => <EnduranceComponent />);