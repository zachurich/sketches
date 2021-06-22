const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const settings = {
  // Make the loop animated
  dimensions: [2074, 2074],
  fps: 30,
  // duration: 6,
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  // Turn on MSAA
  attributes: { antialias: true },
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    context,
  });

  // WebGL background color
  renderer.setClearColor("hsl(0, 0%, 95%)", 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();

  // Setup your scene
  const box = new THREE.BoxGeometry(1, 1, 1);
  const scene = new THREE.Scene();
  const elements = [];
  let mesh;
  for (let i = 0; i <= 100; i++) {
    const range = Math.floor(random.range(20, 80));
    mesh = new THREE.Mesh(
      box,
      new THREE.MeshStandardMaterial({
        color: `hsl(${random.range(0, 360)}, 100%, ${range}%)`,
      })
    );
    const position = 10 * (i * 0.015);
    mesh.position.set(
      random.range(-position, position),
      random.range(-position, position),
      random.range(-position, position)
    );

    mesh.scale.multiplyScalar(1);
    scene.add(mesh);
    elements.push(mesh);
  }

  // scene.add(new THREE.AmbientLight("black"));
  const light = new THREE.DirectionalLight("white", 1.5);
  light.position.set(20, 20, 20);
  scene.add(light);

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight);

      const aspect = viewportWidth / viewportHeight;
      // Ortho zoom
      const zoom = 20;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time, playhead, viewportWidth, viewportHeight }) {
      const aspect = viewportWidth / viewportHeight;
      elements.forEach((el) => {
        el.rotation.y = time * el.position.y;
        el.rotation.z = time * el.position.x;

        // el.scale.y = time <= 5 ? time : el.scale.y;
      });
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
