/**
 * @module Client.Game.States
 * All states
 */

import { IStateFrontend } from '@client/reducers';
import { getSelectedCharacter } from '@client/selector';
import { Character } from '@models';
import React from 'react';
import { connect } from 'react-redux';
import { DoubleBar, InfoBar, SimpleBar } from './Bar';

// tslint:disable-next-line: no-empty-interface
export interface StatesProps {
  character: Character;
}

const mapStateToProps = (state: IStateFrontend) => ({
  character: getSelectedCharacter(state),
});

export const StatesComponent = (props: StatesProps) => {

  const { character } = props;

  if (character === undefined) {
    return null;
  }

  const bmDefault = {
    def: 0,
    resMagie: 0,
  };

  const bonusMalus = character.buffs.reduce(
    (total, buff) => {

      if (buff.operation === 'bonus') {
        total[buff.type] += buff.value;
      } else {
        total[buff.type] -= buff.value;
      }

      return total;
    },
    bmDefault);

  return (
    <div className="States Game__Container">
      <div className="Title">States</div>
      <div>Px {character.xp} | Pi {character.ep}</div>
      <div>(Rang 0)</div>

      <div>Pv</div>
      <DoubleBar actual={character.currentHp} max={character.hp} large={true} />

      <div>Malus</div>
      <SimpleBar actual={Math.abs(bonusMalus.def)} inverted={true} />

      <div>Pa</div>
      <DoubleBar actual={character.currentAgility} max={character.agility} />

      <div>Mouv</div>
      <DoubleBar actual={character.currentSpeed} max={character.speed} />

      <div>Res Magique</div>
      <SimpleBar actual={bonusMalus.resMagie} inverted={true} backgroundColor="blue" />

      <div>Récupération Pv</div>
      <DoubleBar actual={character.regenHp} max={character.maxRegenHp} />

      <div>Récup'Malus</div>
      <DoubleBar actual={character.regenAgility} max={character.maxRegenAgility} />

      <div>Force</div>
      <DoubleBar actual={character.currentStrength} max={character.strength} />

      <div>Perception</div>
      <DoubleBar actual={character.currentInsight} max={character.insight} />

      <div>Niveau de magie</div>
      <InfoBar message={String(character.currentMagic)} />
    </div>
  );
};

export const States = connect(
  mapStateToProps,
)(StatesComponent);
