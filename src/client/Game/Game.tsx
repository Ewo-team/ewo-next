import { setSelectedCharacter } from '@client/actions';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions } from './Actions';
import { Infos } from './Infos';
import { States } from './States';
import { Views } from './Views';

require('./Game.scss');

export interface GameProps {
  selectedCharacter: number;
}

export interface GameComponentProps extends GameProps {
  setSelectedCharacter(mat: number);
}

export class GameComponent extends React.Component<GameComponentProps> {
  public render() {
    return <div className="Game">
      <Infos />
      <Actions />
      <States />
      <Views />
    </div>;
  }

  public componentDidMount() {
    this.props.setSelectedCharacter(this.props.selectedCharacter);
  }

  public shouldComponentUpdate(nextProps: GameComponentProps) {
    if (nextProps.selectedCharacter !== this.props.selectedCharacter) {
      this.props.setSelectedCharacter(nextProps.selectedCharacter);
      return false;
    }
    return true;
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedCharacter: (mat) => dispatch(setSelectedCharacter(mat)),
});

export const Game = connect(undefined, mapDispatchToProps)(GameComponent) as React.StatelessComponent<GameProps>;
