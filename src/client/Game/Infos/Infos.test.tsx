import React from 'react';
import renderer from 'react-test-renderer';
//import configureStore from 'redux-mock-store';
import { EnduranceComponent, ScreenNameComponent } from '.';
import { characterDeadMat2, characterDefaultMat1, characterFullMat3 } from '../../../../test/mock/character';
import { Character } from '../../../engine/models';
import { Plans } from '../../../engine/resources';
import { refreshCharacters, setSelectedCharacter } from '../../actions';
import { Provider } from '../../provider';
import { createStore } from '../../store';
import { Infos } from './Infos';
import { PositionComponent } from './Position';

// tslint:disable
const mockedDate = new Date(2019, 0, 1, 10, 0, 0, 0);
const _Date = Date;
(global as any).Date = jest.fn(() => mockedDate); // minute at 0
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;

//const mockStore = configureStore();

describe('UI Infos', () => {


  describe('Info connected component', () => {

    const store = createStore();

    const def = characterDefaultMat1;
    const full: Character = characterFullMat3;
    const dead: Character = characterDeadMat2;

    store.dispatch(refreshCharacters({
      [def.mat]: characterDefaultMat1,
      [full.mat]: characterFullMat3,
      [dead.mat]: characterDeadMat2,
    }));

    it('Default character', () => {

      renderer.act(() => {
        store.dispatch(setSelectedCharacter(def.mat));
      });

      const component = renderer.create(
        <Provider store={store}>
          <Infos />
        </Provider>
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('default character');
    });

    it('Dead character', () => {

      renderer.act(() => {
        store.dispatch(setSelectedCharacter(dead.mat));
    });

      const component = renderer.create(
        <Provider store={store}>
          <Infos />
        </Provider>
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('dead character');
    });

    it('Full endurance character', () => {

      renderer.act(() => {
        store.dispatch(setSelectedCharacter(full.mat));
      });

      const component = renderer.create(
        <Provider store={store}>
          <Infos />
        </Provider>
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('full character');
    });

    it('no character', () => {

      renderer.act(() => {
        store.dispatch(setSelectedCharacter(undefined));
      });

      const component = renderer.create(
        <Provider store={store}>
          <Infos />
        </Provider>
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('no character');
    });
  })

  describe('Endurance', () => {

    it('should render with minute at 10', () => {

      const character = {
        minutes: 10,
      } as Character;

      const component = renderer.create(
        <EnduranceComponent
          character={character}
        />,
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('minutes 10');
    });

    it('should render with minute at 45', () => {

      const character = {
        minutes: 45,
      } as Character;

      const component = renderer.create(
        <EnduranceComponent
          character={character}
        />,
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('minutes 45');
    });

    it('should render with no minute', () => {
      const character = {} as Character;

      const component = renderer.create(

        <EnduranceComponent
          character={character}
        />,
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('no minutes');
    });

    it('should render with no character', () => {

      const component = renderer.create(

        <EnduranceComponent
          character={undefined}
        />,
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('no character');
    });

  });

  describe('Position', () => {
    it('should render with position in 0 / 0 on Althian', () => {

      const earth = Plans.find(p => p.id === 'earth');

      const character = {
        position: {
          plan: earth,
          coord: {
            x: 0,
            y: 0,
          },
        },
      } as Character;

      const component = renderer.create(
        <PositionComponent
          character={character}
        />,
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('position 0 / 0 on althian');
    });

    it('should render with no position', () => {
      const character = {} as Character;

      const component = renderer.create(

        <PositionComponent
          character={character}
        />,
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('no position');
    });

    it('should render with no character', () => {

      const component = renderer.create(

        <PositionComponent
          character={undefined}
        />,
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('no character');
    });
  });

  describe('ScreenName', () => {
    it('should render with name Jest, mat 1, grade 2g3', () => {


      const character = {
        name: 'Jest',
        mat: 1,
        grade: {
          major: 2,
          minor: 3,
        },
      } as Character;

      const component = renderer.create(
        <ScreenNameComponent
          character={character}
        />,
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('jest mat 1 G2g3');
    });

    it('should render with no character', () => {

      const component = renderer.create(
        <ScreenNameComponent
          character={undefined}
        />,
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('no character');
    });
  });
});
