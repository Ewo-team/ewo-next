/**
 * @module Client.Game.Infos
 * Information module
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Endurance, Position, ScreenName } from '.';

export const InfosComponent = () => {
  return (
    <div className="Infos Game__Container Header">
      <Position />
      <ScreenName />
      <Endurance />
    </div>
  );
};

export const Infos = connect()(InfosComponent);
