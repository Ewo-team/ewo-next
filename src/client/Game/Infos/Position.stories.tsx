import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { number, withKnobs, select } from '@storybook/addon-knobs/react';

import { PositionComponent } from '.';
import { earth, hell, heaven } from 'models/mockCharacter';

const stories = storiesOf('Infos/Position', module);

stories.addDecorator(withKnobs);

stories.add('basic Position', () => <PositionComponent
    position={{
        plan: select('Plan', {
            'earth': earth,
            'hell': hell,
            'heaven': heaven
        }, earth),
        x: number('Position X', 0),
        y: number('Position Y', 0)
    }}
/>);

stories.add('Position is empty', () => <PositionComponent />);