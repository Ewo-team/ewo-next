import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { CharacterList } from './Game/CharacterList';
import { Game } from './Game/Game';

const empty = () => null;

export const Router = () => <BrowserRouter>
  <Switch>
    <Route exact path="/" component={empty} />
    <Route exact path="/game" component={CharacterList} />
    <Route
      path="/game/:selectedCharacter"
      render={(props) => <Game {...props.match.params} />}
    />
  </Switch>
</BrowserRouter>;
