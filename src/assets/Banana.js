/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/useGLTF'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/banana.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={materials.Material}
        geometry={nodes.Cube.geometry}
        position={[-4.65, 2.46, 0]}
        rotation={[0, 0, -0.68]}
      />
    </group>
  )
}

useGLTF.preload('/banana.glb')