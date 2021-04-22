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
          url="https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/sound/icanhearthebells.mp3"
          autoLoad={true}
          playStatus={Sound.status.PLAYING}
          loop={true}
          volume={state.ambientSoundVolume}
        />
        <Wrapper />
      </div>
    </Context.Provider>
  );
};

export default App;
