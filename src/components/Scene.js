import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';

// Components
import Office from './Office';

const Scene = () => {
  const [element, setElement] = React.useState('');

  return (
    <>
      <div className="element">
        <p>Selected element: {element === '' ? 'None' : element}</p>
      </div>
      <Canvas
        camera={{
          position: [-250, 250, 90],
          fov: 65,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls
        //  autoRotate autoRotateSpeed={2}
        />

        <Suspense fallback={null}>
          <Office setElement={setElement} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Scene;
