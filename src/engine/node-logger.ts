/**
 * @module Engine
 * Node Console formatter for redux-logger
 */

const options = {
  downArrow: '▼',
  rightArrow: '▶',
  messageColor: 'bright-yellow',
  prevColor: 'grey',
  actionColor: 'bright-blue',
  nextColor: 'green',
};

const RenderKid = require('renderkid');
const kid = new RenderKid();

export const Logger = {
  message: '',
  prevState: '',
  actionDisplay: '',
  nextState: '',
  log: (...rest) => {

    if (rest.length === 1) {
      if (rest[0] !== '—— log end ——') {
        const parts = rest[0].split('%c');
        const actionType = parts[1].trim();

        const actionTime = parts[2] !== undefined ? parts[2].trim() : '';
        const actionDuration = parts[3] !== undefined ? parts[3].trim() : '';

        Logger.message = `${options.downArrow} action ${actionType} @ ${actionTime} ${actionDuration}`.trim();
      } else {
        // render the buffer
        kid.style({
          label: {},
          list: {
            marginLeft: '1',
          },
          li: {
            marginLeft: '2',
          },
          pre: {
            marginLeft: '4',
            display: 'block',
          },
          message: {
            display: 'block',
            color: options.messageColor,
          },
          prev: {
            color: options.prevColor,
          },
          action: {
            color: options.actionColor,
          },
          next: {
            color: options.nextColor,
          },
        });

        const output = kid.render(`
        <message>
          ${Logger.message}
        </message>
        <ul>
          <li><prev>
            prev state
          </prev></li>
          <pre><prev>
            ${Logger.prevState}
          </prev></pre>
          <li><action>
            action
          </action></li>
          <pre><action>
            ${Logger.actionDisplay}
          </action></pre>
          <li><next>
            next
          </next></li>
          <pre><next>
            ${Logger.nextState}
          </next></pre>
        </ul>
      `);

        console.log(output);
      }
    }

    if (rest.length === 3) {
      const key = rest[0].replace(/%c/g, '').trim();
      const render = Logger.renderToConsole(rest[2], options.rightArrow);

      if (key === 'prev state') {
        Logger.prevState = render;
      } else if (key === 'action') {
        Logger.actionDisplay = render;
      } else if (key === 'next state') {
        Logger.nextState = render;
      }

    }
  },

  renderToConsole: (obj, rightArrow) => {
    try {
      return Logger.topLevel(obj, rightArrow);
    } catch (_e) {
      return obj;
    }
  },

  topLevel: (obj, rightArrow) => {

    let formatted = '';
    Object.keys(obj).forEach(key => {
      if (key.length > 0) {
        formatted += `<label>${rightArrow} ${key}</label>`;
      }
      if (obj[key]) {
        formatted += `<pre>${JSON.stringify(obj[key])}</pre>`;
      }
    });

    return formatted;
  },
};
