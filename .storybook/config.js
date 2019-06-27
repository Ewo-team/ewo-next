import { configure } from '@storybook/react';

// import the styles
//import 'nes.css/css/nes.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../dist/client/App.css';

// automatically import all files ending in *.stories.js, ts, jsx or tsx
const req = require.context('../src', true, /.stories.(js|ts)x+$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
