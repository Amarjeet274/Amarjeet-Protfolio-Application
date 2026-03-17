import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';

export default function SkillCube({ skills }) {
  const cubeRef = useRef();
  useFrame(({ clock }) => {
    cubeRef.current.rotation.y = clock.getElapsedTime() * 0.5;
  });

  return (
    <group ref={cubeRef}>
      {['front', 'back', 'left', 'right', 'top', 'bottom'].map((face, i) => (
        <Box key={i} position={[0,0,0]}>
          <meshStandardMaterial color="hotpink" />
          {/* you can add Text as a child with Html or the Text component from drei */}
        </Box>
      ))}
    </group>
  );
}