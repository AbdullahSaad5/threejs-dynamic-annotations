import { useGLTF, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Model = () => {
  const MODEL_URL = "/cane.glb";
  const { scene } = useGLTF(MODEL_URL);
  const { gl, scene: mainScene, camera } = useThree();
  const [raycaster] = useState(() => new THREE.Raycaster());
  const [mouse] = useState(() => new THREE.Vector2());
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    const handleClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(mainScene.children, true);

      if (intersects.length > 0) {
        const intersect = intersects[0];
        const annotation = {
          id: Math.random(), // Unique ID
          position: intersect.point.clone(),
          name: intersect.object.name,
        };

        setAnnotations((prevAnnotations) => [...prevAnnotations, annotation]);
      }
    };

    gl.domElement.addEventListener("click", handleClick);

    return () => {
      gl.domElement.removeEventListener("click", handleClick);
    };
  }, [gl, mainScene, camera, mouse, raycaster]);

  return (
    <>
      <primitive object={scene} />
      {annotations.map((annotation) => (
        <HtmlAnnotation key={annotation.id} position={annotation.position} name={annotation.name} />
      ))}
    </>
  );
};

const HtmlAnnotation = ({ position, name }) => {
  const { camera } = useThree();
  const [scale, setScale] = useState(1);

  useFrame(() => {
    // Adjust the scale based on camera's zoom level
    const newScale = 1 / camera.zoom;
    setScale(newScale);
  });

  return (
    <Html
      position={position}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "1px 3px", // Adjust padding accordingly
        borderRadius: "2px", // Adjust border radius accordingly
        pointerEvents: "none",
        fontSize: `${scale}em`, // Scale font size dynamically
        transform: `translate(-50%, -50%) scale(${scale * 0.5})`, // Scale based on zoom
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </Html>
  );
};

export default Model;
