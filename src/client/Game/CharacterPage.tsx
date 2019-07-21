/**
 * @module Client.Game
 */

import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectCharacter } from '../actions';
import { IStateFrontend } from '../reducers';
import { Actions } from './Actions';
import { Infos } from './Infos';
import { States } from './States';
import { Views } from './Views';

export interface CharacterPageProps {
  /**
   * The current selected character, by matricule
   */
  selectedCharacter: number;

  /**
   * Flag if the page is loaded
   */
  loaded: boolean;

  /**
   * Flag if the page is curently loading
   */
  loading: boolean;

  /**
   * Error message
   */
  error?: string;
}

export interface CharacterPageComponentProps extends CharacterPageProps {
  /**
   * Action for selecting the character
   * @param mat CHaracter matricule
   */
  selectCharacter(mat: number);
}

export class CharacterPageComponent extends React.Component<CharacterPageComponentProps> {
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

    return (
      <div className="Game">
        <Infos />
        <Actions />
        <States />
        <Views />
      </div>
    );
  }

  public componentDidMount() {
    this.props.selectCharacter(this.props.selectedCharacter);
  }

  public shouldComponentUpdate(nextProps: CharacterPageComponentProps) {
    if (nextProps.selectedCharacter !== this.props.selectedCharacter) {
      this.props.selectCharacter(nextProps.selectedCharacter);
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
});

export const CharacterPage = connect(mapStateToProps, mapDispatchToProps)(CharacterPageComponent) as React.StatelessComponent<CharacterPageProps>;
