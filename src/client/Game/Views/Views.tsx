/**
 * @module Client.Game.Views
 * Views (checkerboard) module for game page
 */

import { IStateFrontend } from '@client/reducers';
import { getSelectedCharacter, getSelectedView } from '@client/selector';
import * as Actions from '@client/socket/actions';
import { MapsTools } from '@engine/Maps/MapsTools';
import { CharacterFrontend, CoordCharacterFrontend, CoordFrontend, Direction, POVState, ViewFrontend } from '@models';
import React from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';

export interface ViewsProps {
  character: CharacterFrontend;
  view: ViewFrontend;
  actions: any;
}

export interface CoordLabel extends CoordFrontend {
  label: string;
}

export interface CoordMeta extends CoordFrontend {
  category: string;
  ui: string;
  meta: any;
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
    const borders: CoordLabel[] = [];

    for (let x = minX + 1; x < maxX; x += 1) {
      borders.push({ x, y: minY, label: String(x), type: 'lab' });
      borders.push({ x, y: maxY, label: String(x), type: 'lab' });
    }

    for (let y = minY + 1; y < maxY; y += 1) {
      borders.push({ x: minX, y, label: String(y), type: 'lab' });
      borders.push({ x: maxX, y, label: String(y), type: 'lab' });
    }

    return borders;

  }

  private generateMoveCoord(direction: number, pos: { x, y }, coords: any[]): any[] {

    const { view } = this.props;

    const found = view.pov.find(c => c.x === pos.x && c.y === pos.y && c.state === POVState.Block);
    if (found === undefined) {

      let className = '';

      switch (direction) {
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

      const move: CoordMeta = {
        x: pos.x,
        y: pos.y,
        type: 'met',
        category: 'move',
        ui: className,
        meta: direction,
      };

      return [...coords, move];
    }

    return coords;
  }

  private generateMoveCoords(x: number, y: number, coords: any[]) {
    // tslint:disable: no-parameter-reassignment
    coords = this.generateMoveCoord(Direction.North, MapsTools.getRelativePosition(x, y, Direction.North), coords);
    coords = this.generateMoveCoord(Direction.NorthEast, MapsTools.getRelativePosition(x, y, Direction.NorthEast), coords);
    coords = this.generateMoveCoord(Direction.East, MapsTools.getRelativePosition(x, y, Direction.East), coords);
    coords = this.generateMoveCoord(Direction.SouthEast, MapsTools.getRelativePosition(x, y, Direction.SouthEast), coords);
    coords = this.generateMoveCoord(Direction.South, MapsTools.getRelativePosition(x, y, Direction.South), coords);
    coords = this.generateMoveCoord(Direction.SouthWest, MapsTools.getRelativePosition(x, y, Direction.SouthWest), coords);
    coords = this.generateMoveCoord(Direction.West, MapsTools.getRelativePosition(x, y, Direction.West), coords);
    coords = this.generateMoveCoord(Direction.NorthWest, MapsTools.getRelativePosition(x, y, Direction.NorthWest), coords);

    return coords;
  }

  private renderCase(coord: any): JSX.Element {
    if (coord.type !== undefined) {

      switch (coord.type) {
        case 'lab': return <div className="item--label">{coord.label}</div>;
        case 'met':
          if (coord.category === 'move') {
            return (
              <div
                role="button"
                className={`item--move ${coord.ui}`}
                onClick={() => { this.clickDirection(coord.meta); }}
              />
            );
          }
        case 'cha': return <div className="item--character">{coord.mat}</div>;
      }

    }
    return null;
  }

  private renderGrid() {

    const { character, view } = this.props;

    if (character.coord === undefined) {
      return <section>Votre personnage n'est plus de ce monde.</section>;
    }

    const centerX = character.coord.x;
    const centerY = character.coord.y;

    const coordCharacter: CoordCharacterFrontend = {
      x: centerX,
      y: centerY,
      character,
      type: 'cha',
    };

    let gridCoords = [
      coordCharacter,
      ...view.characters,
      ...view.pov,
      ...this.generateCoordsBorder(centerX, centerY, character.currentInsight),
    ];

    gridCoords = this.generateMoveCoords(centerX, centerY, gridCoords);

    console.log({ gridCoords });

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
            {this.renderCase(coord)}
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
  view: getSelectedView(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  actions: bindActionCreators(Actions, dispatch),
});

export const Views = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewsComponent);
