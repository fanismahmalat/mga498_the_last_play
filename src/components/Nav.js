import React from 'react';
import lottie from 'lottie-web';
import soundwaves from '../assets/soundwaves.json';

// Assets
import logo from '../assets/logo.png';
import { ReactComponent as InfoIcon } from '../assets/svg/info.svg';

// Context
import { Context } from './Context';

const Nav = ({ instructionRef, backtoseatRef }) => {
  /**
   * Context
   */
  const { state, dispatch } = React.useContext(Context);

  /**
   * Refs
   */
  const animRef = React.useRef();
  const animElRef = React.useRef();

  /**
   * Effects
   */
  React.useEffect(() => {
    animRef.current = lottie.loadAnimation({
      container: animElRef.current,
      animationData: soundwaves,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });

    animRef.current.setSpeed(0.5);

    return () => animRef.current.destroy(); // optional clean up for unmounting
  }, []);

  React.useEffect(() => {
    state.soundEnabled ? animRef.current.play() : animRef.current.stop();
  }, [state.soundEnabled]);

  const showAbout = () => {
    dispatch({
      type: 'field',
      field: 'aboutOpen',
      payload: true,
    });
  };

  const handleSound = () => {
    dispatch({
      type: 'field',
      field: 'soundEnabled',
      payload: !state.soundEnabled,
    });
    const fadeInterval = setInterval(() => {
      let playing = !state.soundEnabled;
      let value = playing ? 0.05 : -0.05;
      if (
        (!playing && state.ambientSoundVolume <= 0) ||
        (playing && state.ambientSoundVolume >= 12)
      ) {
        clearInterval(fadeInterval);
        return;
      }
      dispatch({
        type: 'field',
        field: 'ambientSoundVolume',
        payload: (state.ambientSoundVolume += value),
      });
    }, 3);
  };

  return (
    <div className="navigation">
      <img className="logo" src={logo} alt="The last play logo" />

      <div className="ui">
        <div ref={instructionRef} className="ui-desk">
          <div className="inner">
            <InfoIcon />
            <p>Start exploring by clicking on the desk</p>
          </div>
        </div>
      </div>

      <div className="scene-nav">
        <button ref={backtoseatRef}>Back to the seat</button>
      </div>

      <div className="links">
        <button onClick={showAbout}>about</button>
        <button title="Toggle music on/off" onClick={handleSound}>
          <div className="volume" ref={animElRef} />
        </button>
      </div>
    </div>
  );
};

export default Nav;
