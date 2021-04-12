import React from 'react';
import { motion } from 'framer-motion';

// Assets
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';

// Three
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Context
import { Context } from './Context';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

const ItemInspector = () => {
  /**
   * Context
   */
  const {
    state: { selectedItem, itemInspectorOpen, itemAnimationEnabled, models },
    dispatch,
  } = React.useContext(Context);

  /**
   * Refs
   */
  const containerRef = React.useRef(null);
  const sceneRef = React.useRef(null);
  const recenterRef = React.useRef(null);

  /**
   * Effects
   */
  React.useEffect(() => {
    if (selectedItem !== '') {
      // Create a scene
      const scene = new THREE.Scene();
      // scene.background = new THREE.Color('#F7F9FB');

      // Instantiate the renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

      // Set the size of the renderer
      renderer.setSize(
        containerRef.current.getBoundingClientRect().width,
        containerRef.current.getBoundingClientRect().height
      );
      renderer.setPixelRatio(window.devicePixelRatio);

      // Append the canvas to the div
      sceneRef.current.appendChild(renderer.domElement);

      // Create a camera
      const camera = new THREE.PerspectiveCamera(
        55,
        containerRef.current.getBoundingClientRect().width /
          containerRef.current.getBoundingClientRect().height,
        0.1,
        10000
      );

      // Set camera position
      camera.position.set(0, 0, 50);

      // Shows axis
      const axesHelper = new THREE.AxesHelper(105);
      scene.add(axesHelper);

      // Lights
      const light = new THREE.AmbientLight('#ffffff', 1);
      light.position.set(new THREE.Vector3(10, 0, 0));
      scene.add(light);

      // Add model to scene
      const model = models[selectedItem];

      model.scene.position.set(0, 0, 0);
      model.scene.scale.set(100, 100, 100);

      console.log(model.scene);

      model.scene.traverse(function (child) {
        if (child.isMesh) {
          let m = child;
          m.receiveShadow = true;
          m.castShadow = true;
        }
      });

      scene.add(model.scene);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.02;

      recenterRef.current.addEventListener('click', () => {
        new TWEEN.Tween(camera.position)
          .to({ x: 0, y: 0, z: 50 }, 1000)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start();

        animate();
      });

      const handleWindowResize = () => {
        const width = containerRef.current.getBoundingClientRect().width;
        const height = containerRef.current.getBoundingClientRect().height;

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

        TWEEN.update();
        controls.update();
      };

      animate();

      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }
  }, [selectedItem]);

  /**
   * Handlers
   */
  const handleCloseInspector = () => {
    dispatch({
      type: 'field',
      field: 'itemInspectorOpen',
      payload: false,
    });

    setTimeout(() => {
      dispatch({
        type: 'field',
        field: 'selectedItem',
        payload: '',
      });
    }, 800);
  };

  const handleToggleAnimation = () => {
    dispatch({
      type: 'field',
      field: 'itemAnimationEnabled',
      payload: !itemAnimationEnabled,
    });
  };

  const sceneVariants = {
    enter: {
      opacity: 1,
      // scale: [0, 1],
      y: [-100, 0],
      pointerEvents: 'all',
      visibility: 'visible',
    },
    exit: {
      opacity: 0,
      y: [0, -100],
      pointerEvents: 'none',
      transitionEnd: {
        visibility: 'hidden',
      },
    },
  };

  const overlayVariants = {
    enter: {
      opacity: 1,
      pointerEvents: 'all',
      visibility: 'visible',
    },
    exit: {
      opacity: 0,
      pointerEvents: 'none',
      transitionEnd: {
        visibility: 'hidden',
      },
    },
  };

  return (
    <>
      <motion.div
        initial={false}
        exit={false}
        variants={overlayVariants}
        animate={itemInspectorOpen ? 'enter' : 'exit'}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.15 }}
        className="overlay"
      />

      <motion.div
        initial={false}
        exit={false}
        variants={sceneVariants}
        animate={itemInspectorOpen ? 'enter' : 'exit'}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="item-wrapper"
      >
        <button className="close-btn" onClick={handleCloseInspector}>
          <CloseIcon />
        </button>
        <button className="recenter-btn" ref={recenterRef}>
          Recenter
        </button>
        <button className="animation-toggle-btn" onClick={handleToggleAnimation}>
          {itemAnimationEnabled ? 'Stop animation' : 'Resume animation'}
        </button>

        <div
          ref={containerRef}
          className={`item-container ${itemAnimationEnabled ? '' : 'stop-animation'}`}
        >
          <div ref={sceneRef} className="item" />
        </div>
      </motion.div>
    </>
  );
};

export default ItemInspector;
