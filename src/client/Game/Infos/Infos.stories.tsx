// import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Infos } from '.';
import { characterFrontendDeadMat2, characterFrontendDefaultMat1, characterFrontendFullMat3 } from '../../../../test/mock/character';
import { CharacterFrontend } from '../../../engine/models';
import { refreshCharacters, setSelectedCharacter } from '../../actions';
import { Provider } from '../../provider';
import { createStore } from '../../store';
import { frontendInitialState } from '../../../../test/mock/frontendStore';

export const store = createStore(undefined, frontendInitialState);

const withProvider = (story: any) => (
  <Provider store={store}>
    {story()}
  </Provider>
);

const stories = storiesOf('Infos', module);

stories.addDecorator(withProvider);
stories.addDecorator(withA11y);

const def: CharacterFrontend = characterFrontendDefaultMat1;
const dead: CharacterFrontend = characterFrontendDeadMat2;
const full: CharacterFrontend = characterFrontendFullMat3;


stories.add('Full Endurance', () => {
  store.dispatch(setSelectedCharacter(full.mat));
  return <Infos />;
});

stories.add('Dead', () => {
  store.dispatch(setSelectedCharacter(dead.mat));
  return <Infos />;
});

stories.add('In Action, reload in 10 minutes', () => {
  store.dispatch(setSelectedCharacter(def.mat));
  return <Infos />;
});
