/**
 * @module Client.Game.Infos
 * Position module
 */

import { IStateFrontend } from '@client/reducers';
import { getSelectedCharacter } from '@client/selector';
import { CharacterFrontend, Plan } from '@models';
import * as React from 'react';
import { connect } from 'react-redux';
import { Plans } from '@engine/resources';

export interface PositionProps {
  character: CharacterFrontend;
}

export const PositionComponent = (props: PositionProps) => {

  if (props.character === undefined) {
    return null;
  }


  if (props.character.coord) {
    const { plan, x, y } = props.character.coord;
    const planObj: Plan = Plans[plan];
    return <div className="Infos__Position">Sur <a href="gps">{planObj.name}</a> en X = {x} <b>| </b>Y = {y}</div>;
  }
  return <div className="Infos__Position">Nullepart</div>;
};

const mapStateToProps = (state: IStateFrontend) => ({
  character: getSelectedCharacter(state),
});

export const Position = connect(
  mapStateToProps,
)(PositionComponent);
