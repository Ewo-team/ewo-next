/**
 * @module Client.Game.Infos
 * Name, grade and level module
 */

import { IStateFrontend } from '@client/reducers';
import { getSelectedCharacter } from '@client/selector';
import { Character } from '@models';
import * as React from 'react';
import { connect } from 'react-redux';

export interface ScreenNameProps {
  character: Character;
}

export const ScreenNameComponent = (props: ScreenNameProps) => {

  if (props.character === undefined) {
    return null;
  }
  const { name, mat, grade } = props.character;

  return (
    <div className="Infos__ScreenName">
      <strong>{name}</strong> ({mat}) | Grade {grade.major} galon {grade.minor}
    </div>
  );
};

const mapStateToProps = (state: IStateFrontend) => ({
  character: getSelectedCharacter(state),
});

export const ScreenName = connect(
  mapStateToProps,
)(ScreenNameComponent);
