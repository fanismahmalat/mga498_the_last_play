import React, { Suspense } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import Loading from './Loading';
import { Interaction } from 'three.interaction';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const Scene = () => {
  const [loading, setLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const elemRef = React.useRef(null);
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
    camera.position.set(200, 20, -280);

    // FPS counter
    const stats = new Stats();
    fpsRef.current.appendChild(stats.dom);

    // Interaction (clicks)
    new Interaction(renderer, scene, camera);

    // Shows axis
    const axesHelper = new THREE.AxesHelper(105);
    scene.add(axesHelper);

    // Lights
    const light = new THREE.AmbientLight('#ffffff', 0.5);
    light.position.set(new THREE.Vector3(0, 0, 0));
    scene.add(light);

    const dLight1 = new THREE.DirectionalLight(0xffffff, 1);
    dLight1.position.set(new THREE.Vector3(10, 10, 5));
    scene.add(dLight1);

    const dLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
    dLight2.position.set(new THREE.Vector3(-10, -40, -5));
    scene.add(dLight2);

    const pLight = new THREE.PointLight('white', 1, 500);
    light.position.set(-150, -150, 250);
    scene.add(pLight);

    // GLTF Loader
    const loader = new GLTFLoader(manager);
    const draco = new DRACOLoader();
    draco.setDecoderPath('three/examples/js/libs/draco/draco_decoder.js');
    loader.setDRACOLoader(draco);

    loader.load(
      '/scene/office_2.glb',
      function (gltf) {
        // Set model coordinates
        gltf.scene.position.set(40, -50, -50);
        gltf.scene.scale.set(40, 40, 40);

        // Add model to scene
        scene.add(gltf.scene);

        console.log(gltf.scene);

        // Add click listener
        // gltf.scene.children[0].children[0].on('click', () => {
        //   console.log('desk clicked');
        // });

        // Set loading to false
        setLoading(false);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    manager.onProgress = function (item, loaded, total) {
      console.log('Loaded:', (loaded / total) * 100 + '%');

      if ((loaded / total) * 100 !== 50) {
        setProgress((loaded / total) * 100);
      }
    };

    // const raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enabled = false; // disable cursor orbit

    // Camera move based on mouse interaction
    var mouse = { x: 0, y: 0 };
    function mouseMove(e) {
      camera.position.x += Math.max(Math.min((mouse.x - e.clientX) * 0.01, 0.2), -0.2);
      camera.position.y += Math.max(Math.min((mouse.y - e.clientY) * 0.01, 0.2), -0.2);
      // camera.position.x += (mouse.x - lookPosition.x) / easeAmount;
      // camera.position.y += (mouse.y - lookPosition.y) / easeAmount;

      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    window.addEventListener('mousemove', mouseMove);

    const handleWindowResize = () => {
      const width = sceneRef.current.clientWidth;
      const height = sceneRef.current.clientHeight;

      if (sceneRef.current.clientWidth < 600) {
        console.log('small');
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
      stats.update();
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div ref={elemRef} className="element">
        <p>Selected element: </p>
      </div>

      <Loading progress={progress} />
      <div ref={sceneRef} className="scene" />
      <div ref={fpsRef} className="fps" />
    </Suspense>
  );
};

export default Scene;
