/**
 * @module Client.Redux
 */

import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

export const Provider = ({ children, store }: any) => (
  <ReduxProvider store={store}>
    {children}
  </ReduxProvider>
);
