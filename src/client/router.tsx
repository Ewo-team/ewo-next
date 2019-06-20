import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CharacterList } from './Game/CharacterList';
import { Game } from './Game/Game';

export const Router = () => <BrowserRouter>
  <Route path="/" component={CharacterList} />
  <Route
    path="/:selectedCharacter"
    render={(props) => <Game {...props.match.params} />}
  />
</BrowserRouter>;
