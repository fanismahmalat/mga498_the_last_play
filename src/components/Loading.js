import React from 'react';
import { LinearProgress } from '@material-ui/core';

const Loading = ({ progress }) => {
  return (
    <div
      className="loading"
      style={{
        opacity: progress !== 100 ? '1' : '0',
        pointerEvents: progress !== 100 ? 'all' : 'none',
      }}
    >
      <div className="loading-inner">
        <span>Loading...</span>
        <LinearProgress variant="buffer" valueBuffer={progress} value={progress} />
      </div>
    </div>
  );
};

export default Loading;
