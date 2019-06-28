/**
 * @module Client.Router
 * Application Router
 */

import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { CharacterPage } from './Game/CharacterPage';
import { CharactersList } from './Game/CharactersList';

const empty = () => null;

export const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={empty} />
      <Route exact={true} path="/game" component={CharactersList} />
      <Route
        path="/game/:selectedCharacter"
        render={(props) => <CharacterPage {...props.match.params} />}
      />
    </Switch>
  </BrowserRouter>
);
