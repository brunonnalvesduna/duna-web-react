import { useThree, extend } from '@react-three/fiber'
import { TrackballControls } from '@react-three/drei';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { useEffect, useState } from 'react';



export default function PCUploaded({ uploadedFile }: { uploadedFile: File | undefined }) {
  const [geometry, setgeometry] = useState<THREE.BufferGeometry>()
  const [pointsMaterial, setPointsMaterial] = useState<THREE.PointsMaterial>(new THREE.PointsMaterial({ size: 0.02, vertexColors: true }));
  const [formData, setFormData] = useState(new FormData());
  const [plyLoader, setPlyLoader] = useState(new PLYLoader());

  useEffect(() => {
    if (uploadedFile) {
      // let formData = new FormData();
      formData.append('files', uploadedFile);

      fetch("http://localhost:5174/upload", {
        method: "POST",
        body: formData
      }).then(async (response) => {
        console.log(JSON.stringify(response))
        console.log(formData)
        plyLoader.loadAsync('http://localhost:5174/clouds/upload', (xhr: any) => {
          console.log(xhr.loaded / xhr.total * 100 + '% loaded');
        }).then(value => setgeometry(value))
        // await renderer.loadCloudFile('upload')
        // renderer.renderLoadedModel()
      })
    }
  }, [uploadedFile])

  // const PointCloudMesh = () => {
  //   const loaded_model = new THREE.Points(
  //     geometry,
  // new THREE.PointsMaterial(
  //   {
  //     size: 0.02,
  //     vertexColors: true
  //   }
  // )
  //   )
  //   console.log('Model loaded.')
  //   return (
  //     <primitive object={loaded_model} />
  //   )
  // }

  return <>
    <color attach="background" args={['#000']} />
    <TrackballControls />

    <mesh>
      <points geometry={geometry} material={pointsMaterial} />
      {/* <PointCloudMesh /> */}
    </mesh>

    {/* <directionalLight position={[1, 2, 3]} intensity={1.5} />
    <ambientLight intensity={0.5} />

    <mesh position-x={- 2}>
      <sphereGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>

    <mesh position-x={2} scale={1.5}>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>

    <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
      <planeGeometry />
      <meshStandardMaterial color="greenyellow" />
    </mesh> */}

  </>
}