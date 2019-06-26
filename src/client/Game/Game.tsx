import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectCharacter } from '../actions';
import { IStateFrontend } from '../reducers';
import { Actions } from './Actions';
import { Infos } from './Infos';
import { States } from './States';
import { Views } from './Views';

require('./Game.scss');

export interface GameProps {
  selectedCharacter: number;
  loaded: boolean;
  loading: boolean;
  error?: string;
}

export interface GameComponentProps extends GameProps {
  selectCharacter(mat: number);
  //loadView(mat: number);
}

export class GameComponent extends React.Component<GameComponentProps> {
  public render() {

    const { loaded, loading, error } = this.props;

    if (loading) {
      return <i className="fas fa-spinner">Loading...</i>;
    }

    if (error) {
      return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    if (!loaded) {
      return <div>Vous n'êtes pas connecté</div>;
    }

    return <div className="Game">
      <Infos />
      <Actions />
      <States />
      <Views />
    </div>;
  }

  public componentDidMount() {
    console.log({ props: this.props });
    this.props.selectCharacter(this.props.selectedCharacter);
    //this.props.loadView(this.props.selectedCharacter);
  }

  public shouldComponentUpdate(nextProps: GameComponentProps) {
    if (nextProps.selectedCharacter !== this.props.selectedCharacter) {
      this.props.selectCharacter(nextProps.selectedCharacter);
      //this.props.loadView(this.props.selectedCharacter);
      return false;
    }
    return true;
  }
}

const mapStateToProps = (state: IStateFrontend) => ({
  loaded: state.loaded,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  selectCharacter: (mat) => dispatch(selectCharacter(mat)),
  /*loadView: (mat) => dispatch(loadView(mat)),*/
});

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComponent) as React.StatelessComponent<GameProps>;
