import { IStateFrontend } from '@client/reducers';
import { getSelectedCharacter } from '@client/selector';
import { Character } from '@models';
import React from 'react';
import { connect } from 'react-redux';
import { DoubleBar, InfoBar, SimpleBar } from './Bar';

require('./States.scss');

// tslint:disable-next-line: no-empty-interface
export interface StatesProps extends Character {

}

const mapStateToProps = (state: IStateFrontend) => ({
  ...getSelectedCharacter(state),
});

export const StatesComponent = (props: StatesProps) => {

  const bmDefault = {
    def: 0,
    resMagie: 0,
  };

  const bonusMalus = props.buffs.reduce(
    (total, buff) => {

      if (buff.operation === 'bonus') {
        total[buff.type] += buff.value;
      } else {
        total[buff.type] -= buff.value;
      }

      return total;
    },
    bmDefault);

  return <div className="States Game__Container">
    <div className="Title">States</div>
    <div>Px {props.xp} | Pi {props.ep}</div>
    <div>(Rang 0)</div>

    <div>Pv</div>
    <DoubleBar actual={props.hp} max={props.maxHp} large />

    <div>Malus</div>
    <SimpleBar actual={Math.abs(bonusMalus.def)} inverted />

    <div>Pa</div>
    <DoubleBar actual={props.ap} max={props.agility} />

    <div>Mouv</div>
    <DoubleBar actual={props.speed} max={props.speedPoints} />

    <div>Res Magique</div>
    <SimpleBar actual={bonusMalus.resMagie} inverted backgroundColor="blue" />

    <div>Récupération Pv</div>
    <DoubleBar actual={props.regen} max={props.regen} />

    <div>Récup'Malus</div>
    <DoubleBar actual={props.debuffRegen} max={props.debuffRegen} />

    <div>Force</div>
    <DoubleBar actual={props.strength} max={props.strength} />

    <div>Perception</div>
    <DoubleBar actual={props.insight} max={props.insight} />

    <div>Niveau de magie</div>
    <InfoBar message={String(props.magic)} />
  </div>;
};

export const States = connect(
  mapStateToProps,
)(StatesComponent);
