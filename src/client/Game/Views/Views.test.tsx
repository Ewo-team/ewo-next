import React from 'react';
import renderer from 'react-test-renderer';
import { Views, ViewsComponent } from '.';
import { characterFrontendDeadMat2, characterFrontendDefaultMat1, characterFrontendFullMat3 } from '../../../../test/mock/character';
import { frontendInitialState } from '../../../../test/mock/frontendStore';
import { CharacterFrontend } from '../../../engine/models';
import { setSelectedCharacter } from '../../actions';
import { Provider } from '../../provider';
import { createStore } from '../../store';

describe('UI Views', () => {

  describe('Views', () => {

    describe('Views connected component', () => {

      const store = createStore(undefined, frontendInitialState);

      const def: CharacterFrontend = characterFrontendDefaultMat1;
      const dead: CharacterFrontend = characterFrontendDeadMat2;
      const full: CharacterFrontend = characterFrontendFullMat3;

      it('Default character', () => {

        renderer.act(() => {
          store.dispatch(setSelectedCharacter(def.mat));
        });

        const component = renderer.create(
          (
            <Provider store={store}>
              <Views />
            </Provider>
          ),
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot('default character');
      });

      it('Dead character', () => {

        renderer.act(() => {
          store.dispatch(setSelectedCharacter(dead.mat));
        });

        const component = renderer.create(
          (
            <Provider store={store}>
              <Views />
            </Provider>
          ),
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot('dead character');
      });

      it('Full endurance character', () => {

        renderer.act(() => {
          store.dispatch(setSelectedCharacter(full.mat));
        });

        const component = renderer.create(
          (
            <Provider store={store}>
              <Views />
            </Provider>
          ),
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot('full character');
      });

      it('no character', () => {

        renderer.act(() => {
          store.dispatch(setSelectedCharacter(undefined));
        });

        const component = renderer.create(
          (
            <Provider store={store}>
              <Views />
            </Provider>
          ),
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot('no character');
      });
    });

    it('should render', () => {

      const component = renderer.create(
        (
          <ViewsComponent
            actions={{ socketActionMovement: jest.fn }}
            character={characterFrontendDefaultMat1}
            view={frontendInitialState.views[1]}
          />
        ),
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('render');
    });

  });

});
