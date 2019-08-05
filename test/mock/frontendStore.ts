import { IStateFrontend } from '@client/reducers';
import {
  characterDefaultMat1,
  characterFrontendDeadMat2,
  characterFrontendDefaultMat1,
  characterFrontendFullMat3,
  characterFrontendLimitedDefaultMat1,
  characterFullMat3,
} from './character';

export const frontendInitialState: IStateFrontend = {
  loaded: true,
  loading: false,
  characters: {
    1: characterFrontendDefaultMat1,
    2: characterFrontendDeadMat2,
    3: characterFrontendFullMat3,
  },
  views: {
    1: {
      characters: [],
      pov: [],
      environment: [],
      tileImage: 'demo.png',
    },
    3: {
      characters: [
        {
          x: characterFrontendDefaultMat1.coord.x,
          y: characterFrontendDefaultMat1.coord.y,
          character: characterFrontendLimitedDefaultMat1,
          type: 'cha',
        }],
      pov: [],
      environment: [],
      tileImage: 'demo.png',
    },
  },
};
