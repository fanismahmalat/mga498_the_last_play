// import React from 'react';
// import { Html, useGLTF, useFBX } from 'drei';
// import { useSpring, a } from '@react-spring/three';
// import { useFrame, useUpdate } from 'react-three-fiber';
// import { Vector3 } from 'three';
// import { gsap } from 'gsap';

// const Office = (props) => {
//   const laternRef = React.useRef(null);
//   const { setElement, setCamPos } = props;
//   const group = React.useRef();
//   const { nodes, materials } = useGLTF('/desk2/desk2_compressed.glb', true);

//   const [laternZ, setLaternZ] = React.useState(-37.38);

//   React.useEffect(() => {
//     gsap.to(laternRef.current, {
//       z: laternZ,
//       duration: 1,
//     });
//   }, [laternZ]);

//   const [{ z }, setPos] = useSpring(() => ({
//     z: -37.38,
//   }));

//   return (
//     <>
//       <group ref={group} {...props} dispose={null}>
//         <mesh
//           castShadow
//           material={materials.Object006_mtl}
//           geometry={nodes.desk.geometry}
//           position={[0, 53.78, 16.29]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           onClick={(e) => {
//             e.stopPropagation();
//             setElement('Desk');
//           }}
//         />
//         <mesh
//           castShadow
//           material={materials.Object008_mtl}
//           geometry={nodes.chairs.geometry}
//           position={[0, 82.49, 29.59]}
//           rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
//           onClick={(e) => {
//             e.stopPropagation();
//             setElement('Chair');
//           }}
//         />
//         <a.mesh
//           ref={laternRef}
//           castShadow
//           material={materials.lantern_mtl}
//           geometry={nodes.lantern.geometry}
//           position={[0, 122.8, z]}
//           // position={[0, 122.8, -37.38]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           onClick={(e) => {
//             e.stopPropagation();
//             setElement('Lantern');
//             setPos({ z: 0 });
//           }}
//         />
//         <mesh
//           castShadow
//           material={materials.Line047_mtl}
//           geometry={nodes.paper_left.geometry}
//           position={[0, 104.93, 53.89]}
//           rotation={[0, 0.4, 0]}
//           onClick={(e) => {
//             e.stopPropagation();
//             console.log(e.object.position);

//             setCamPos(e.object.position);
//             setElement('Paper');
//           }}
//         />
//         <mesh
//           castShadow
//           material={materials.Line048_mtl}
//           geometry={nodes.paper_right.geometry}
//           position={[0, 105.69, 3.57]}
//           rotation={[0, 1.31, 0]}
//           onClick={(e) => {
//             e.stopPropagation();
//             const pos = new Vector3(
//               e.object.position.x,
//               e.object.position.y + 40,
//               e.object.position.z
//             );
//             console.log(pos);
//             setCamPos(pos);
//             setElement('Paper');
//           }}
//         />
//         <mesh
//           castShadow
//           material={materials.Box009_mtl}
//           geometry={nodes.ground.geometry}
//           position={[0, 2.82, 0]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           onClick={(e) => {
//             e.stopPropagation();
//             setElement('Ground');
//           }}
//         />
//         <mesh
//           castShadow
//           material={materials.Plane002_mtl}
//           geometry={nodes.mat.geometry}
//           position={[0, 5.87, 10.5]}
//           rotation={[-Math.PI / 2, 0, 0]}
//           onClick={(e) => {
//             e.stopPropagation();
//             setElement('Mat');
//           }}
//         />
//       </group>
//     </>
//   );
// };

// export default Office;
