import { IStateFrontend } from '@client/reducers';
import { getSelectedCharacter } from '@client/selector';
import { CharacterPosition } from '@models';
import * as React from 'react';
import { connect } from 'react-redux';

require('./Position.scss');

export interface PositionProps {
  position?: CharacterPosition;
}

export const PositionComponent = (props?: PositionProps) => {
  if (props && props.position) {
    const { plan, coord: { x, y } } = props.position;
    return <div className="Infos__Position">Sur <a href="gps">{plan.name}</a> en X = {x} <b>| </b>Y = {y}</div>;
  }
  return <div className="Infos__Position">Nullepart</div>;
};

const mapStateToProps = (state: IStateFrontend) => ({
  position: getSelectedCharacter(state).position,
});

export const Position = connect(
  mapStateToProps,
)(PositionComponent);
