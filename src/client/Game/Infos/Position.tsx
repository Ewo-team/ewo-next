import { IStateFrontend } from '@client/reducers';
import { getSelectedCharacter } from '@client/selector';
import { Character } from '@models';
import * as React from 'react';
import { connect } from 'react-redux';

export interface PositionProps {
  character: Character;
}

export const PositionComponent = (props: PositionProps) => {

  if (props.character === undefined) {
    return null;
  }

  if (props.character.position) {
    const { plan, coord: { x, y } } = props.character.position;
    return <div className="Infos__Position">Sur <a href="gps">{plan.name}</a> en X = {x} <b>| </b>Y = {y}</div>;
  }
  return <div className="Infos__Position">Nullepart</div>;
};

const mapStateToProps = (state: IStateFrontend) => ({
  character: getSelectedCharacter(state),
});

export const Position = connect(
  mapStateToProps,
)(PositionComponent);
