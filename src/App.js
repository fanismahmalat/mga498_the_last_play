import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Context
import Wrapper from './components/Wrapper';
import { Context, SettingsReducer, initialState } from './components/Context';

const App = () => {
  /**
   * Context
   */
  const [state, dispatch] = React.useReducer(SettingsReducer, initialState);

  /**
   * State
   */

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={Wrapper} />
            <Route
              exact
              path="/book"
              component={() => {
                window.location.href = 'https://www.tickettailor.com/events/thelastplay/516981';
                return null;
              }}
            />
          </Switch>
        </Router>
      </div>
    </Context.Provider>
  );
};

export default App;
