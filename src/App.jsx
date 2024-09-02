/* eslint-disable react/no-unknown-property */
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import Model from "./Model";

function App() {
  const cameraRef = useRef();
  return (
    <Canvas shadows>
      <Model />
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={2} />
      <directionalLight position={[2, 4, 2]} intensity={0.5} castShadow />
      <PerspectiveCamera
        makeDefault
        position={[5, 5, 5]}
        ref={cameraRef}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
        fov={60}
      />
      <OrbitControls
        maxPolarAngle={Math.PI / 2 - THREE.MathUtils.degToRad(1)}
        minPolarAngle={Math.PI / 2 - THREE.MathUtils.degToRad(70)}
        // maxDistance={8}
        // minDistance={2}
        // dampingFactor={0.2}
      />
    </Canvas>
  );
}

export default App;
