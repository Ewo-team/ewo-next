import { IStateFrontend } from '@client/reducers';
import { getSelectedCharacter, getSelectedCoords } from '@client/selector';
import * as Actions from '@client/socket/actions';
import { MapsTools } from '@engine/Maps/MapsTools';
import { Character, CoordFrontend, Direction } from '@models';
import React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

export interface ViewsProps {
  character: Character;
  coords: CoordFrontend[];
  actions: any;
}

export class ViewsComponent extends React.Component<ViewsProps> {

  constructor(props: ViewsProps) {
    super(props);

    this.clickDirection = this.clickDirection.bind(this);
  }

  public render() {

    if (this.props.character === undefined) {
      return null;
    }

    return (
      <div className="Views Game__Container">
        <div className="Title">Views</div>
        {this.renderGrid()}
      </div>
    );
  }

  private generateCoordsBorder(centerX: number, centerY: number, insight: number) {
    const minX = centerX - insight;
    const maxX = centerX + insight;
    const minY = centerY - insight;
    const maxY = centerY + insight;
    const borders: CoordFrontend[] = [];

    for (let x = minX + 1; x < maxX; x += 1) {
      borders.push({ x, y: minY, label: String(x) });
      borders.push({ x, y: maxY, label: String(x) });
    }

    for (let y = minY + 1; y < maxY; y += 1) {
      borders.push({ x: minX, y, label: String(y) });
      borders.push({ x: maxX, y, label: String(y) });
    }

    return borders;

  }

  private generateMoveCoord(id: number, pos: { x, y }, coords: CoordFrontend[]): CoordFrontend[] {
    const found = coords.find(c => c.x === pos.x && c.y === pos.y);
    if (found === undefined) {

      let className = '';

      switch (id) {
        case Direction.North:
          className = 'fas fa-arrow-up';
          break;
        case Direction.NorthEast:
          className = 'fas fa-arrow-up turn45';
          break;
        case Direction.East:
          className = 'fas fa-arrow-right';
          break;
        case Direction.SouthEast:
          className = 'fas fa-arrow-right turn45';
          break;
        case Direction.South:
          className = 'fas fa-arrow-down';
          break;
        case Direction.SouthWest:
          className = 'fas fa-arrow-down turn45';
          break;
        case Direction.West:
          className = 'fas fa-arrow-left';
          break;
        case Direction.NorthWest:
          className = 'fas fa-arrow-left turn45';
          break;
      }

      return [...coords, {
        x: pos.x,
        y: pos.y,
        type: 'move',
        ui: className,
        meta: id,
      }];
    }

    return coords;
  }

  private generateMoveCoords(coord: CoordFrontend, coords: CoordFrontend[]) {

    // tslint:disable: no-parameter-reassignment
    coords = this.generateMoveCoord(Direction.North, MapsTools.getRelativePosition(coord.x, coord.y, Direction.North), coords);
    coords = this.generateMoveCoord(Direction.NorthEast, MapsTools.getRelativePosition(coord.x, coord.y, Direction.NorthEast), coords);
    coords = this.generateMoveCoord(Direction.East, MapsTools.getRelativePosition(coord.x, coord.y, Direction.East), coords);
    coords = this.generateMoveCoord(Direction.SouthEast, MapsTools.getRelativePosition(coord.x, coord.y, Direction.SouthEast), coords);
    coords = this.generateMoveCoord(Direction.South, MapsTools.getRelativePosition(coord.x, coord.y, Direction.South), coords);
    coords = this.generateMoveCoord(Direction.SouthWest, MapsTools.getRelativePosition(coord.x, coord.y, Direction.SouthWest), coords);
    coords = this.generateMoveCoord(Direction.West, MapsTools.getRelativePosition(coord.x, coord.y, Direction.West), coords);
    coords = this.generateMoveCoord(Direction.NorthWest, MapsTools.getRelativePosition(coord.x, coord.y, Direction.NorthWest), coords);

    return coords;
  }

  private renderGrid() {

    const { character, coords } = this.props;

    const position = coords.find(c => c.mat === character.mat);

    if (position === undefined) {
      return <section>Votre personnage n'est plus de ce monde.</section>;
    }

    const centerX = position.x;
    const centerY = position.y;

    let gridCoords = [
      ...coords,
      ...this.generateCoordsBorder(centerX, centerY, character.currentInsight),
    ];

    gridCoords = this.generateMoveCoords(position, gridCoords);

    return (
      <section className={`grid grid-${character.currentInsight}`}>
        {gridCoords.map((coord, index) => {
          // +1 for centering, and another +1 for the ruler row and column
          const offsetX = coord.x - centerX + character.currentInsight + 2;
          const offsetY = coord.y - centerY + character.currentInsight + 2;
          return <div
            key={index}
            className="item"
            style={{
              gridColumn: offsetX,
              gridRow: offsetY,
            }}
          >
            {coord.label && <div className="item--label">{coord.label}</div>}
            {coord.mat && <div className="item--character">{coord.mat}</div>}
            {coord.type === 'move' && <div
              role="button"
              className={`item--move ${coord.ui}`}
              onClick={() => { this.clickDirection(coord.meta); }}
            />
            }
          </div>;
        })}
      </section>
    ); // {character.mat} ({coord.x}/{coord.y})
  }

  private clickDirection(direction) {
    this.props.actions.socketActionMovement(this.props.character.mat, direction);
  }
}

const mapStateToProps = (state: IStateFrontend) => ({
  character: getSelectedCharacter(state),
  coords: getSelectedCoords(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: bindActionCreators(Actions, dispatch),
});

export const Views = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewsComponent);
