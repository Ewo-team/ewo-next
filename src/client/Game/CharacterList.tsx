import { IStateFrontend } from '@client/reducers';
import { Character } from '@models';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export interface CharacterListProps {
  characters: Character[];
}

export const CharacterListComponent: React.StatelessComponent<CharacterListProps> = (props) => <div>
  <table>
    <thead>
      <tr>
        <th colSpan={2}>Nom</th>
        <th>PV</th>
        <th>Mvt</th>
        <th>PA</th>
        <th>Force</th>
        <th>Dext.</th>
        <th>Malus</th>
        <th>Magie</th>
        <th>Recup. PV-Malus</th>
        <th>Vue</th>
        <th>PI/XP</th>
        <th>Endurance</th>
      </tr>
    </thead>
    <tbody>
      {props.characters.map(character => {
        return <tr>
          <td></td>
          <td><Link to={`/${character.mat}`}>{character.name} ({character.mat})</Link></td>
          <td>{character.hp}/{character.maxHp}</td>
          <td>{character.speed}/{character.speedPoints}</td>
          <td>{character.ap}/{character.agility}</td>
          <td>{character.strength}/{character.strength}</td>
          <td>dext</td>
          <td>malus</td>
          <td>magie</td>
          <td>recup</td>
          <td>{character.insight}/{character.insight}</td>
          <td>{character.ep}/{character.xp}</td>
          <td>endu</td>
        </tr>;
      })}
    </tbody>
  </table>
</div>;

const mapStateToProps = (state: IStateFrontend) => ({
  characters: state.characters,
});

export const CharacterList = connect(mapStateToProps)(CharacterListComponent);
