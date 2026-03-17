import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

export default function FloatingShape() {
  const meshRef = useRef();

  useFrame(({ clock, mouse }) => {
    // gentle rotation
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    // slight movement based on mouse (normalized)
    meshRef.current.position.x = (mouse.x * 0.5) || 0;
    meshRef.current.position.y = (-mouse.y * 0.5) || 0;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
      <MeshDistortMaterial
        color="#8b5cf6"
        emissive="#4c1d95"
        roughness={0.2}
        metalness={0.8}
        distort={0.3}
        speed={2}
      />
    </Sphere>
  );
}