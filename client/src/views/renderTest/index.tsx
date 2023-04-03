import React, { useMemo } from 'react';
// material-ui
import { Button, FormGroup, FormLabel, OutlinedInput, Typography } from '@mui/material';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { ProcessPointCloudClient } from "../../infra-proto/gen-proto/PointcloudServiceClientPb";
import * as PC from "../../infra-proto/gen-proto/pointcloud_pb";
import * as gRPCConverter from "../../utils/gRPCConverter";
import { Renderer } from '../../classes/Renderer'
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Canvas, extend, useThree } from '@react-three/fiber';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import * as THREE from 'three';
import { TrackballControls } from '@react-three/drei';
import PCUploaded from './PCUploaded';


// ==============================|| SAMPLE PAGE ||============================== //

const RenderTest = () => {
    const canvasRef = useRef<HTMLDivElement>(null!);
    const voxelRes = useRef<HTMLElement>(null!);
    const [file, setFile] = useState<File>();

    const [pcClient, setPcCLient] = useState(new ProcessPointCloudClient("http://" + location.hostname + ":5000"));

    // Main renderer object.
    const [renderer, setRenderer] = useState(new Renderer());
    const [geometry, setgeometry] = useState<THREE.BufferGeometry>()

    // useEffect(() => {
    //     if (canvasRef.current.childElementCount === 0) {
    //         const viewer = canvasRef.current.appendChild(renderer.domElement());
    //         console.log(viewer)
    //     }
    // }, [])




    const PointCloudMesh = () => {
        const loaded_model = new THREE.Points(
            geometry,
            new THREE.PointsMaterial(
                {
                    size: 0.02,
                    vertexColors: true
                }
            )
        )
        console.log('Model loaded.')
        return (
            <primitive object={loaded_model} />
        )
    }



    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            let file = e.target.files[0];
            console.log(file)
            setFile(file);
            // let formData = new FormData();
            // formData.append('files', file);

            // fetch("http://localhost:5174/upload", {
            //     method: "POST",
            //     body: formData
            // }).then(async (response) => {
            //     console.log(JSON.stringify(response))
            //     console.log(formData)
            //     new PLYLoader().loadAsync('http://localhost:5174/clouds/upload', (xhr: any) => {
            //         console.log(xhr.loaded / xhr.total * 100 + '% loaded');
            //     }).then(value => setgeometry(value))
            // await renderer.loadCloudFile('upload')
            // renderer.renderLoadedModel()
            // })
        }
    }

    const onFilterApplyButtonClick = async () => {
        // const inputElement = voxelRes.current.firstElementChild as HTMLInputElement;
        // const inputValue = inputElement.value;
        // const grpc_cloud = gRPCConverter.toGRPC(renderer.getLoadedModel())
        // var voxelRequest = new PC.VoxelFilterInput();
        // voxelRequest.setPointcloud(grpc_cloud)
        // voxelRequest.setResolution(+inputValue)
        // console.log('calling voxelGrid filter with resolution:', +inputValue)
        // let start = performance.now()
        // const reply = await pcClient.voxelGrid(voxelRequest, null);
        // console.log(reply)
        // const three_cloud = gRPCConverter.fromGRPC(reply);
        // renderer.renderSingeCloud(three_cloud);
    }

    return (
        <MainCard title="Render Test">
            <Button variant='contained' component='label' sx={{ position: 'absolute', marginTop: '8px', marginLeft: '8px', zIndex: 1 }}>
                Upload
                <input hidden accept=".ply" multiple type="file" onChange={handleUploadFile} />
            </Button>
            <div style={{ position: 'absolute', right: '5%', marginTop: '8px', zIndex: 1, display: 'flex', flexDirection: 'column', alignContent: 'center', gap: 8 }}>
                <Button variant='contained' onClick={onFilterApplyButtonClick}>Voxelize!</Button>
                <FormGroup row sx={{ alignItems: 'center', gap: 1 }}>
                    <FormLabel>VoxelRes =</FormLabel>
                    {/* <OutlinedInput ref={voxelRes} /> */}
                </FormGroup>
            </div>
            <div
                // ref={canvasRef}
                style={{ height: 'calc(100vh - 88px - 20px - 72px - 20px - 54px)', width: '100%' }}
            >
                <Canvas>
                    <PCUploaded uploadedFile={file} />
                    {/* <color attach="background" args={['#000']} />
                    <TrackballControls />
                    <mesh>
                        <PointCloudMesh />
                    </mesh> */}
                </Canvas>
            </div>
        </MainCard >
    );
};

export default RenderTest;
