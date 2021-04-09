import React from 'react';

// Components
import Scene from './components/Scene';

// Context
import { Context, SettingsReducer, initialState } from './components/Context';

const App = () => {
  /**
   * Context
   */
  const [state, dispatch] = React.useReducer(SettingsReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="app">
        <Scene />
      </div>
    </Context.Provider>
  );
};

export default App;
