import React from 'react';
import Sound from 'react-sound';

// Context
import Wrapper from './components/Wrapper';
import { Context, SettingsReducer, initialState } from './components/Context';

const App = () => {
  /**
   * Context
   */
  const [state, dispatch] = React.useReducer(SettingsReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <div className="app">
        <Sound
          url="/scene/sound/icanhearthebells.mp3"
          autoLoad={true}
          playStatus={Sound.status.PLAYING}
          loop={true}
          volume={state.ambientSoundVolume}
          onError={(code, desc) => console.log(code, desc)}
        />
        <Wrapper />
      </div>
    </Context.Provider>
  );
};

export default App;
