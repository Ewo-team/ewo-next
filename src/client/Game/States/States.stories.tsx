// import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { States } from '.';
import { characterDeadMat2, characterDefaultMat1, characterFullMat3 } from '../../../../test/mock/character';
import { Character } from '../../../engine/models';
import { refreshCharacters, setSelectedCharacter } from '../../actions';
import { Provider } from '../../provider';
import { createStore } from '../../store';

export const store = createStore();

const withProvider = (story: any) => (
  <Provider store={store}>
    {story()}
  </Provider>
);
const stories = storiesOf('States', module);

const def = characterDefaultMat1;
const full: Character = characterFullMat3;
const dead: Character = characterDeadMat2;

store.dispatch(refreshCharacters({
  [def.mat]: characterDefaultMat1,
  [full.mat]: characterFullMat3,
  [dead.mat]: characterDeadMat2,
}));

stories.addDecorator(withProvider);
stories.addDecorator(withA11y);

stories.add('Full Endurance', () => {
  store.dispatch(setSelectedCharacter(full.mat));
  return <States />;
});

stories.add('Dead', () => {
  store.dispatch(setSelectedCharacter(dead.mat));
  return <States />;
});

stories.add('In Action, reload in 10 minutes', () => {
  store.dispatch(setSelectedCharacter(def.mat));
  return <States />;
});
