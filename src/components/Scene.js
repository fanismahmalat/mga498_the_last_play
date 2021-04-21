import React, { Suspense } from 'react';

// Three
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { Interaction } from 'three.interaction';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

// Context
import { Context } from './Context';

const Scene = ({ instructionRef, backtoseatRef }) => {
  /**
   * Context
   */
  const { state, dispatch } = React.useContext(Context);

  /**
   * Refs
   */
  const sceneRef = React.useRef(null);
  const fpsRef = React.useRef(null);

  React.useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F7F9FB');

    // Instantiate the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const manager = new THREE.LoadingManager();

    // Set the size of the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Append the canvas to the div
    sceneRef.current.appendChild(renderer.domElement);

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );

    // Set camera position
    camera.position.set(115, -10, -110);

    // FPS counter
    const stats = new Stats();
    // fpsRef.current.appendChild(stats.dom);

    // Interaction (clicks)
    new Interaction(renderer, scene, camera);

    // Shows axis
    const axesHelper = new THREE.AxesHelper(105);
    scene.add(axesHelper);

    // Lights
    const light = new THREE.AmbientLight('#ffffff', 0.6);
    light.position.set(new THREE.Vector3(0, 50, 0));
    scene.add(light);

    const pLight1 = new THREE.PointLight('white', 0.8, 0);
    pLight1.position.set(150, 0, -50);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight('white', 0.6, 0);
    pLight2.position.set(-50, 0, -50);
    scene.add(pLight2);

    const sphereSize = 20;
    const pointLightHelper1 = new THREE.PointLightHelper(pLight1, sphereSize);
    scene.add(pointLightHelper1);
    const pointLightHelper2 = new THREE.PointLightHelper(pLight2, sphereSize);
    scene.add(pointLightHelper2);

    // const gridHelper = new THREE.GridHelper(500, 20);
    // scene.add(gridHelper);

    // GLTF Loader
    const loader = new GLTFLoader(manager);

    const loadAsync = (url) => {
      return new Promise((resolve) => {
        loader.load(url, (gltf) => {
          resolve(gltf);
        });
      });
    };

    Promise.all([
      // loadAsync(
      //   'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/office.glb'
      // ),
      // loadAsync(
      //   'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/items/typewriter.glb'
      // ),
      // loadAsync(
      //   'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/items/closure_paper3.glb'
      // ),
      // loadAsync(
      //   'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/items/script.glb'
      // ),
      loadAsync('/scene/office.glb'),
      loadAsync('/scene/items/closure_paper.glb'),
      loadAsync('/scene/items/glass.glb'),
      loadAsync('/scene/items/king.glb'),
      loadAsync('/scene/items/open_folder.glb'),
      loadAsync('/scene/items/paper_left.glb'),
      loadAsync('/scene/items/portrait.glb'),
      loadAsync('/scene/items/typewritter.glb'),
    ]).then((models) => {
      // Set context for individual items
      const individuals = models.filter((model, i) => i !== 0);

      dispatch({
        type: 'field',
        field: 'models',
        payload: {
          closure_paper: individuals[0],
          glass: individuals[1],
          king: individuals[2],
          open_folder: individuals[3],
          paper_left: individuals[4],
          portrait: individuals[5],
          typewritter: individuals[6],
        },
      });

      // Get office model
      const office = models[0];

      // Set model coordinates
      office.scene.position.set(40, -40, -50);
      office.scene.scale.set(40, 40, 40);

      office.scene.traverse(function (child) {
        if (child.isMesh) {
          let m = child;
          m.receiveShadow = true;
          m.castShadow = true;
        }
      });

      // Add model to scene
      scene.add(office.scene);

      const interactiveObjects = office.scene.children.filter(
        (item) =>
          item.name === 'Desk' ||
          item.name === 'closure_paper' ||
          item.name === 'script' ||
          item.name === 'casting_sheet' ||
          item.name === 'king' ||
          item.name === 'typewritter' ||
          item.name === 'portrait' ||
          item.name === 'glass' ||
          item.name === 'folder_with_certificate'
      );

      // Add click listener
      interactiveObjects.forEach((el) => {
        el.on('mouseover', () => {
          if (el.name === 'Desk') {
            return new TWEEN.Tween(el.children[0].material.color)
              .to({ r: 1.8, g: 1.8, b: 1.1 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
            // return highlight(true, el);
          }

          if (el.name === 'typewritter') {
            return new TWEEN.Tween(el.children[0].material.color)
              .to({ r: 0.75, g: 0.55, b: 0.16 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
          }

          if (el.name === 'closure_paper') {
            return new TWEEN.Tween(el.children[0].material.color)
              .to({ r: 0.75, g: 0.62, b: 0.24 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
          }
        });

        el.on('mouseout', () => {
          if (el.name === 'Desk') {
            // return highlight(false, el);
            return new TWEEN.Tween(el.children[0].material.color)
              .to({ r: 1, g: 1, b: 1 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
          }

          if (el.name === 'typewritter') {
            return new TWEEN.Tween(el.children[0].material.color)
              .to({ r: 0.002899999963119626, g: 0.029999999329447746, b: 0 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
          }

          if (el.name === 'closure_paper') {
            return new TWEEN.Tween(el.children[0].material.color)
              .to({ r: 1, g: 1, b: 1 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
          }
        });

        el.on('click', () => {
          let selected = '';

          if (el.name === 'Desk') {
            new TWEEN.Tween(instructionRef.current.style)
              .to({ opacity: 0 }, 2000)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .onComplete(() => (instructionRef.current.style.visibility = 'hidden'))
              .start();

            new TWEEN.Tween(backtoseatRef.current.style)
              .to({ opacity: 1 }, 1000)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .onStart(() => (backtoseatRef.current.style.visibility = 'visible'))
              .start();

            new TWEEN.Tween(camera.position)
              .to({ x: 62, y: 15, z: -20 }, 2000)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();

            new TWEEN.Tween(controls.target)
              .to({ x: 62, y: -20, z: -35 }, 2000)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();

            return;
          }

          if (el.name === 'casting_sheet' || el.name === 'script') {
            selected = 'paper_left';
          }

          if (el.name === 'folder_with_certificate') {
            selected = 'open_folder';
          }

          if (
            el.name === 'portrait' ||
            el.name === 'glass' ||
            el.name === 'typewritter' ||
            el.name === 'closure_paper' ||
            el.name === 'king'
          ) {
            selected = el.name;
          }

          dispatch({
            type: 'field',
            field: 'selectedItem',
            payload: selected,
          });

          dispatch({
            type: 'field',
            field: 'itemInspectorOpen',
            payload: true,
          });
        });
      });
    });

    manager.onProgress = function (item, loaded, total) {
      if ((loaded / total) * 100 !== 50) {
        dispatch({
          type: 'field',
          field: 'sceneProgress',
          payload: (loaded / total) * 100,
        });
      }
    };

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, -20, 0);
    // controls.enabled = false; // disable cursor orbit
    controls.enableDamping = true;
    controls.dampingFactor = 0.02;

    // Back button
    backtoseatRef.current.addEventListener('click', () => {
      new TWEEN.Tween(instructionRef.current.style)
        .to({ opacity: 1 }, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onStart(() => (instructionRef.current.style.visibility = 'visible'))
        .start();

      new TWEEN.Tween(backtoseatRef.current.style)
        .to({ opacity: 0 }, 1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onComplete(() => (backtoseatRef.current.style.visibility = 'hidden'))
        .start();

      new TWEEN.Tween(camera.position)
        .to({ x: 115, y: -10, z: -110 }, 2000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();

      new TWEEN.Tween(controls.target)
        .to({ x: 0, y: -20, z: 0 }, 2000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .start();
    });

    const handleWindowResize = () => {
      const width = sceneRef.current.clientWidth;
      const height = sceneRef.current.clientHeight;

      if (sceneRef.current.clientWidth < 600) {
        camera.fov = 100;
      } else {
        camera.fov = 55;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    // Responsive
    window.addEventListener('resize', handleWindowResize);

    // Animate canvas
    const animate = function () {
      // Tells the browser what to do before the next repaint
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
      controls.update();
      stats.update();
      TWEEN.update();
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [dispatch]);

  return (
    <Suspense fallback={'loading'}>
      <div ref={sceneRef} className="scene" />
      <div ref={fpsRef} className="fps" />
    </Suspense>
  );
};

export default Scene;
