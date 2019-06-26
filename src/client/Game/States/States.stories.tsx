// import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { States } from '.';
import { characterDead, characterDefault, characterFull } from '../../../engine/resources/mockData';
import { loadSuccess, setSelectedCharacter } from '../../actions';
import { Provider } from '../../provider';
import { createStore } from '../../store';

export const store = createStore();

const withProvider = (story: any) => (
  <Provider store={store}>
    {story()}
  </Provider>
);

const stories = storiesOf('States', module);

stories.addDecorator(withProvider);
stories.addDecorator(withA11y);

store.dispatch(loadSuccess([characterDefault, characterFull, characterDead]));

stories.add('Full Endurance', () => {
  store.dispatch(setSelectedCharacter(1));
  return <States />;
});

stories.add('Dead', () => {
  store.dispatch(setSelectedCharacter(2));
  return <States />;
});

stories.add('In Action, reload in 10 minutes', () => {
  store.dispatch(setSelectedCharacter(3));
  return <States />;
});
