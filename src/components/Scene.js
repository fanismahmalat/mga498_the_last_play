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
  const { dispatch } = React.useContext(Context);

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
      // loadAsync('/scene/Office_.glb'),
      loadAsync(
        'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/Office_.glb'
      ),
      // loadAsync('/scene/individuals/glass.glb'),
      loadAsync(
        'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/individuals/glass.glb'
      ),
      // loadAsync('/scene/individuals/closure_paper.glb'),
      loadAsync(
        'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/individuals/closure_paper.glb'
      ),
      // loadAsync('/scene/individuals/king.glb'),
      loadAsync(
        'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/individuals/king.glb'
      ),
      // loadAsync('/scene/individuals/open_folder.glb'),
      loadAsync(
        'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/individuals/open_folder.glb'
      ),
      // loadAsync('/scene/individuals/paper_left.glb'),
      loadAsync(
        'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/individuals/paper_left.glb'
      ),
      // loadAsync('/scene/individuals/portrait.glb'),
      loadAsync(
        'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/individuals/portrait.glb'
      ),
      // loadAsync('/scene/individuals/typewriter.glb'),
      loadAsync(
        'https://cdn.jsdelivr.net/gh/fanismahmalat/mga498_the_last_play/public/scene/individuals/typewriter.glb'
      ),
    ]).then((models) => {
      // Set context for individual individuals
      const individuals = models.filter((model, i) => i !== 0);

      dispatch({
        type: 'field',
        field: 'models',
        payload: {
          glass: individuals[0],
          closure_paper: individuals[1],
          king: individuals[2],
          open_folder: individuals[3],
          paper_left: individuals[4],
          portrait: individuals[5],
          typewriter: individuals[6],
        },
      });

      // Get office model
      const office = models[0];

      // Set model coordinates
      office.scene.position.set(40, -40, -50);
      office.scene.scale.set(40, 40, 40);

      office.scene.traverse(function (child) {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }

        if (child.isLight) {
          child.castShadow = true;
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
          item.name === 'typewriter' ||
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
          }

          if (el.name === 'portrait') {
            return el.children.forEach((child) => {
              new TWEEN.Tween(child.material.color)
                .to({ r: 1.4, g: 1.4, b: 0.9 }, 300)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
            });
          }

          if (el.name === 'glass') {
            return new TWEEN.Tween(el.children[3].material.color)
              .to({ r: 1.7, g: 1.7, b: 1.1 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
          }

          if (el.name === 'script' || el.name === 'casting_sheet' || el.name === 'king') {
            return new TWEEN.Tween(el.material.color)
              .to({ r: 0.65, g: 0.62, b: 0.24 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
          }

          if (el.name === 'folder_with_certificate') {
            return el.children[0].children.forEach((child) => {
              new TWEEN.Tween(child.material.color)
                .to({ r: 1.3, g: 1.3, b: 0.7 }, 300)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
            });
          }

          if (el.name === 'typewriter') {
            el.children[0].children.forEach((child) => {
              new TWEEN.Tween(child.material.color)
                .to({ r: 0.6, g: 0.6, b: 0.26 }, 300)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
            });

            new TWEEN.Tween(el.children[1].material.color)
              .to({ r: 1.3, g: 1.3, b: 0.7 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();

            return;
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
            return new TWEEN.Tween(el.children[0].material.color)
              .to({ r: 1, g: 1, b: 1 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
          }

          if (el.name === 'portrait') {
            return el.children.forEach((child) => {
              new TWEEN.Tween(child.material.color)
                .to({ r: 1, g: 1, b: 1 }, 300)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
            });
          }

          if (el.name === 'glass') {
            return new TWEEN.Tween(el.children[3].material.color)
              .to({ r: 1, g: 1, b: 1 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
          }

          if (el.name === 'script' || el.name === 'casting_sheet' || el.name === 'king') {
            return new TWEEN.Tween(el.material.color)
              .to({ r: 1, g: 1, b: 1 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();
          }

          if (el.name === 'folder_with_certificate') {
            return el.children[0].children.forEach((child) => {
              new TWEEN.Tween(child.material.color)
                .to({ r: 1, g: 1, b: 1 }, 300)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
            });
          }

          if (el.name === 'typewriter') {
            el.children[0].children.forEach((child) => {
              new TWEEN.Tween(child.material.color)
                .to({ b: 0.035, g: 0.09, r: 0.04 }, 300)
                .easing(TWEEN.Easing.Quadratic.InOut)
                .start();
            });

            new TWEEN.Tween(el.children[1].material.color)
              .to({ r: 1, g: 1, b: 1 }, 300)
              .easing(TWEEN.Easing.Quadratic.InOut)
              .start();

            return;
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
            backtoseatRef.current.style.opacity = 1;
            backtoseatRef.current.style.pointerEvents = 'all';

            instructionRef.current.querySelector('#text').innerHTML =
              'Click on the items to inspect them';

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
            el.name === 'typewriter' ||
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

        el.on('touchend', () => {
          let selected = '';

          if (el.name === 'Desk') {
            backtoseatRef.current.style.opacity = 1;
            backtoseatRef.current.style.pointerEvents = 'all';

            instructionRef.current.querySelector('#text').innerHTML =
              'Click on the items to inspect them';

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
            el.name === 'typewriter' ||
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
      backtoseatRef.current.style.opacity = 0;
      backtoseatRef.current.style.pointerEvents = 'none';
      instructionRef.current.querySelector('#text').innerHTML =
        'Start exploring by clicking on the desk';

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
  }, [dispatch, backtoseatRef, instructionRef]);

  return (
    <Suspense fallback={'loading'}>
      <div ref={sceneRef} className="scene" />
      <div ref={fpsRef} className="fps" />
    </Suspense>
  );
};

export default Scene;
