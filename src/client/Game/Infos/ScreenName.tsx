import { IStateFrontend } from '@client/reducers';
import { getSelectedCharacter } from '@client/selector';
import { CharacterGrade } from '@models';
import * as React from 'react';
import { connect } from 'react-redux';

require('./ScreenName.scss');

export interface ScreenNameProps {
  name: string;
  mat: number;
  grade: CharacterGrade;
}

export const ScreenNameComponent = ({ name: pseudo, mat, grade }: ScreenNameProps) => <div className="Infos__ScreenName">
  <strong>{pseudo}</strong> ({mat}) | Grade {grade.major} galon {grade.minor}
</div>;

const mapStateToProps = (state: IStateFrontend) => ({
  name: getSelectedCharacter(state).name,
  grade: getSelectedCharacter(state).grade,
});

export const ScreenName = connect(
  mapStateToProps,
)(ScreenNameComponent);
