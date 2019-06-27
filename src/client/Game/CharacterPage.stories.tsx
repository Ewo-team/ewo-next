//import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { characterDeadMat2, characterDefaultMat1, characterFullMat3 } from '../../../test/mock/character';
import { Character } from '../../../engine/models';
import { refreshCharacters, refreshMaps } from '../actions';
import { Provider } from '../provider';
import { createStore } from '../store';
import { CharacterPage } from './CharacterPage';

export const store = createStore();

const withProvider = (story: any) => (
  <Provider store={store}>
    {story()}
  </Provider>
);

const stories = storiesOf('CharacterPage', module);

const def: Character = characterDefaultMat1;
const full: Character = characterFullMat3;
const dead: Character = characterDeadMat2;

store.dispatch(refreshCharacters({
  [def.mat]: characterDefaultMat1,
  [full.mat]: characterFullMat3,
  [dead.mat]: characterDeadMat2,
}));

store.dispatch(refreshMaps(1, [{...characterDefaultMat1.position.coord, mat: 1}]));
store.dispatch(refreshMaps(3, [
  {...characterFullMat3.position.coord, mat: 3},
  {...characterDefaultMat1.position.coord, mat: 1}
]));

stories.addDecorator(withProvider);
stories.addDecorator(withA11y);

stories.add('Full Endurance', () => {
  //store.dispatch(setSelectedCharacter(full.mat));
  return <CharacterPage selectedCharacter={full.mat} />;
});

stories.add('Dead', () => {
  //store.dispatch(setSelectedCharacter(dead.mat));
  return <CharacterPage selectedCharacter={dead.mat} />;
});

stories.add('In Action, reload in 10 minutes', () => {
  //store.dispatch(setSelectedCharacter(def.mat));
  return <CharacterPage selectedCharacter={def.mat} />;
});
