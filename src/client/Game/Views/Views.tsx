import { IStateFrontend } from '@client/reducers';
import { getSelectedCharacter, getSelectedCoords } from '@client/selector';
import { Character, Coord, CoordFrontend } from '@models';
import React from 'react';
import { connect } from 'react-redux';

require('./Views.scss');

export interface ViewsProps {
  character: Character;
  coords: CoordFrontend[];
}

export class ViewsComponent extends React.Component<ViewsProps> {

  public render() {

    if (this.props.character === undefined) {
      return null;
    }

    return <div className="Views Game__Container">
      <div className="Title">Views</div>
      {this.renderGrid()}
    </div>;
  }

  private renderGrid() {

    const { character, coords } = this.props;

    const position = coords.find(c => c.mat === character.mat);

    if (position === undefined) {
      return <section>Votre personnage n'est plus de ce monde.</section>;
    }

    const centerX = position.x;
    const centerY = position.y;

    return <ul className={`grid grid-${character.currentInsight}`}>
      {coords.map((coord, index) => {
        // +1 for centering, and another +1 for the ruler row and column
        const offsetX = coord.x - centerX + character.currentInsight + 2;
        const offsetY = coord.y - centerY + character.currentInsight + 2;
        return <li key={index} className="item" style={{
          gridColumn: offsetX,
          gridRow: offsetY,
        }} ><div>{character.mat} ({coord.x}/{coord.y})</div></li>;
      })}
    </ul>;
  }
}

const mapStateToProps = (state: IStateFrontend) => ({
  character: getSelectedCharacter(state),
  coords: getSelectedCoords(state),
});

export const Views = connect(
  mapStateToProps,
)(ViewsComponent);
