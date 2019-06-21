import { load } from '@client/actions';
import { IStateFrontend } from '@client/reducers';
import { Character } from '@models';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export interface CharacterListProps {
  characters: Character[];
  loaded: boolean;
  loading: boolean;
  error?: string;
  load();
}

export class CharacterListComponent extends React.Component<CharacterListProps> {

  public render() {
    const { loaded, loading, characters, error } = this.props;

    if (loading) {
      return <i className="fas fa-spinner">Loading...</i>;
    }

    if (error) {
      return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    if (!loaded) {
      return <div>Vous n'êtes pas connecté</div>;
    }

    return <div>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Nom</th>
            <th>PV</th>
            <th>Mvt</th>
            <th>PA</th>
            <th>Force</th>
            <th>Dext.</th>
            <th>Magie</th>
            <th>Vue</th>
            <th>PI/XP</th>
            <th>Endurance</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => {
            return <tr key={character.mat}>
              <td></td>
              <td><Link to={`/game/${character.mat}`}>{character.name} ({character.mat})</Link></td>
              <td>{character.currentHp}/{character.xp}</td>
              <td>{character.currentSpeed}/{character.speed}</td>
              <td>{character.currentAgility}/{character.agility}</td>
              <td>{character.currentStrength}/{character.strength}</td>
              <td>{character.currentDexterity}/{character.dexterity}</td>
              <td>{character.currentMagic}/{character.magic}</td>
              <td>{character.currentInsight}/{character.insight}</td>
              <td>{character.ep}/{character.xp}</td>
              <td>endu</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>;
  }

  public componentWillMount() {
    this.props.load();
  }
}

const mapStateToProps = (state: IStateFrontend) => ({
  characters: state.characters,
  loaded: state.loaded,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  load: () => dispatch(load()),
});

export const CharacterList = connect(mapStateToProps, mapDispatchToProps)(CharacterListComponent);
