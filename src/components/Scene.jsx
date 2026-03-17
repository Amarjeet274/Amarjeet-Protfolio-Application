import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

export default function Scene({ children, cameraPosition = [0, 0, 5] }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,           // ensures canvas stays behind overlay
      }}
    >
      <color attach="background" args={['#111']} />
      <PerspectiveCamera makeDefault position={cameraPosition} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {children}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}




