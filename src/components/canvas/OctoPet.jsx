import React, { useRef, useState } from "react";
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import useStore from '@/helpers/store'

export default function OctoPetVox(props) {
  const router = useStore((s) => s.router)
  const group = useRef();
  const [hovered, setHover] = useState(false)
  const { nodes, materials } = useGLTF("/assets/models/babyocto-vox.glb");
  const { route, animate } = props
  const clock = new THREE.Clock();
  let previousTime = 0;
  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (group.current && animate) {
      group.current.position.x = -3.5 + Math.sin(elapsedTime * 0.9) * Math.PI * 0.05;
      group.current.position.y = 4 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.5;
      group.current.position.z = -2.5 - Math.cos(elapsedTime * 0.1) * Math.PI * 0.3;
      group.current.rotation.y = elapsedTime * 0.005;
      group.current.rotation.z = -elapsedTime * 0.05;
    }
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["cuteocto-pet"].geometry}
        material={materials['palette.004']}
        rotation={[Math.PI * 0.5, 0, 0]}
        onClick={() => router.push(route)}
        // onPointerOver={(e) => setHover(true)}
        // onPointerOut={(e) => setHover(false)}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/babyocto-vox.glb");