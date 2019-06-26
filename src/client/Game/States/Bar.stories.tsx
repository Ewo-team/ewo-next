import { withA11y } from '@storybook/addon-a11y';
// import { action } from '@storybook/addon-actions';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import React from 'react';

import withPropsCombinations from 'react-storybook-addon-props-combinations';

import { DoubleBar } from '.';
import { InfoBar, SimpleBar } from './Bar';

const stories = storiesOf('States/Bar', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withA11y);

stories.add('InfoBar all states', withPropsCombinations(
  InfoBar,
  {
    message: ['message'],
    inverted: [undefined, true, false],
  },
));

stories.add('InfoBar', () => <InfoBar
  message={text('Message', 'message', 'Bar')}
  inverted={boolean('Inverted', false, 'Bar')}
/>);

stories.add('SimpleBar all states', withPropsCombinations(
  SimpleBar,
  {
    actual: [0, 1, 5],
    message: [undefined, 'message'],
    inverted: [undefined, true, false],
  },
));

stories.add('SimpleBar', () => <SimpleBar
  actual={number('Actual', 0, { range: true, min: 0, max: 5, step: 1 }, 'Bar')}
  message={text('Message', '', 'Bar')}
  inverted={boolean('Inverted', false, 'Bar')}
/>);

stories.add('DoubleBar all states', withPropsCombinations(
  DoubleBar,
  {
    actual: [80, 160, 200],
    max: [200],
    inverted: [undefined, true, false],
    large: [undefined, true, false],
  },
));

stories.add('DoubleBar colors', withPropsCombinations(
  DoubleBar,
  {
    actual: [160],
    max: [200],
    inverted: [false],
    backgroundColor: ['green', 'red', 'blue', 'yellow', 'gray', 'none'],
    valueColor: ['green', 'red', 'blue', 'yellow', 'gray', 'none'],
  },
));

stories.add('DoubleBar', () => <DoubleBar
  actual={number('Actual', 0, { range: true, min: 0, max: 10, step: 1 }, 'Bar')}
  max={number('Max', 10, { range: true, min: 0, max: 10, step: 1 }, 'Bar')}
  inverted={boolean('Inverted', false, 'Bar')}
  large={boolean('Large', false, 'Bar')}
/>);
