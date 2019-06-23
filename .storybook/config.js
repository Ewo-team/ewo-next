import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';

// import the styles
//import 'nes.css/css/nes.css';
import 'bootstrap/dist/css/bootstrap.css';

// automatically import all files ending in *.stories.js, ts, jsx or tsx
const req = requireContext('../src', true, /.stories.(js|ts)x+$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
