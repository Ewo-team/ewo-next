import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import { Infos } from '.';
import { Provider } from 'provider';
import { createStore } from 'store';
import { loadSuccess } from 'actions';
import { characterFull, characterDead, characterDefault } from 'models/mockCharacter';

export const store = createStore();

const withProvider = (story: any) => (
    <Provider store={store}>
        {story()}
    </Provider>
)

const stories = storiesOf('Infos', module);

stories.addDecorator(withProvider);
stories.addDecorator(withA11y);



stories.add('Full Endurance', () => {
    store.dispatch(loadSuccess(characterFull));
    return <Infos />;
});

stories.add('Dead', () => {
    store.dispatch(loadSuccess(characterDead));
    return <Infos />;
});

stories.add('In Action, reload in 10 minutes', () => {
    store.dispatch(loadSuccess(characterDefault));
    return <Infos />;
});