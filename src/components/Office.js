import React from 'react';
import { Html, useGLTF, useFBX } from 'drei';

const Office = (props) => {
  const group = React.useRef();
  const { nodes, materials } = useGLTF('/desk2/desk2_compressed.glb', true);

  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <mesh
          material={materials.Object006_mtl}
          geometry={nodes.desk.geometry}
          position={[0, 53.78, 16.29]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          material={materials.Object008_mtl}
          geometry={nodes.chairs.geometry}
          position={[0, 82.49, 29.59]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          onClick={() => {
            props.setElement('Chair');
          }}
        />
        <mesh
          material={materials.lantern_mtl}
          geometry={nodes.lantern.geometry}
          position={[0, 122.8, -37.38]}
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={() => {
            props.setElement('Lantern');
          }}
        />
        <mesh
          material={materials.Line047_mtl}
          geometry={nodes.paper_left.geometry}
          position={[0, 104.93, 53.89]}
          rotation={[0, 0.4, 0]}
          onClick={() => {
            props.setElement('Paper');
          }}
        />
        <mesh
          material={materials.Line048_mtl}
          geometry={nodes.paper_right.geometry}
          position={[0, 105.69, 3.57]}
          rotation={[0, 1.31, 0]}
          onClick={() => {
            props.setElement('Paper');
          }}
        />
        <mesh
          material={materials.Box009_mtl}
          geometry={nodes.ground.geometry}
          position={[0, 2.82, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          material={materials.Plane002_mtl}
          geometry={nodes.mat.geometry}
          position={[0, 5.87, 10.5]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </>
  );
};

export default Office;
