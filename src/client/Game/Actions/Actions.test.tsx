import React from 'react';
import renderer from 'react-test-renderer';
import { Actions } from '.';

describe('UI Actions', () => {

  describe('Actions', () => {

    it('should render', () => {

      const component = renderer.create(
        (
          <Actions />
        ),
      );

      const tree = component.toJSON();
      expect(tree).toMatchSnapshot('render');
    });

  });

});
