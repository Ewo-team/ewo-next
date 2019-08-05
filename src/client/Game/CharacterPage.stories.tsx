// import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { characterFrontendDeadMat2, characterFrontendDefaultMat1, characterFrontendFullMat3 } from '../../../test/mock/character';
import { frontendInitialState } from '../../../test/mock/frontendStore';
import { CharacterFrontend } from '../../engine/models';
import { Provider } from '../provider';
import { createStore } from '../store';
import { CharacterPage } from './CharacterPage';

export const store = createStore(undefined, frontendInitialState);

const withProvider = (story: any) => (
  <Provider store={store}>
    {story()}
  </Provider>
);

const stories = storiesOf('CharacterPage', module);

const def: CharacterFrontend = characterFrontendDefaultMat1;
const dead: CharacterFrontend = characterFrontendDeadMat2;
const full: CharacterFrontend = characterFrontendFullMat3;

/*store.dispatch(refreshCharacters({
  [def.mat]: def,
  [full.mat]: full,
  [dead.mat]: dead,
}));

store.dispatch(refreshMaps(1, [{ x: def.coord.x, y: def.coord.y, mat: 1 }]));
store.dispatch(refreshMaps(3, [
  { x: full.coord.x, y: full.coord.y, mat: 3 },
  { x: def.coord.y, y: def.coord.y, mat: 1 },
]));*/

stories.addDecorator(withProvider);
stories.addDecorator(withA11y);

stories.add('Full Endurance', () => {
  return <CharacterPage selectedCharacter={full.mat} loaded={true} loading={false} />;
});

stories.add('Dead', () => {
  return <CharacterPage selectedCharacter={dead.mat} loaded={true} loading={false} />;
});

stories.add('In Action, reload in 10 minutes', () => {
  return <CharacterPage selectedCharacter={def.mat} loaded={true} loading={false} />;
});
