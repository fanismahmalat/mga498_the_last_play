import React from 'react';

// Components
import Loading from './Loading';
import Scene from './Scene';
import ItemInspector from './ItemInspector';

// Context
import { Context } from './Context';
import Nav from './Nav';
import About from './About';

const Wrapper = () => {
  /**
   * Context
   */
  const { state } = React.useContext(Context);

  /**
   * Refs
   */
  const instructionRef = React.useRef();
  const backtoseatRef = React.useRef();

  return (
    <div className="app-wrapper">
      <Loading />
      {state.selectedItem !== '' && <ItemInspector />}
      <About />
      <Nav instructionRef={instructionRef} backtoseatRef={backtoseatRef} />
      <Scene instructionRef={instructionRef} backtoseatRef={backtoseatRef} />
    </div>
  );
};

export default Wrapper;
