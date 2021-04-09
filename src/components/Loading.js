import React from 'react';

// Material UI
import { LinearProgress } from '@material-ui/core';

// Context
import { Context } from './Context';

const Loading = () => {
  /**
   * Context
   */
  const {
    state: { sceneProgress },
  } = React.useContext(Context);

  return (
    <div
      className="loading"
      style={{
        opacity: sceneProgress !== 100 ? '1' : '0',
        pointerEvents: sceneProgress !== 100 ? 'all' : 'none',
      }}
    >
      <div className="loading-inner">
        <span>Loading...</span>
        <LinearProgress variant="buffer" valueBuffer={sceneProgress} value={sceneProgress} />
      </div>
    </div>
  );
};

export default Loading;
