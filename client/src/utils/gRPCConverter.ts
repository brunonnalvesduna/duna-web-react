// import {Point, PointCloud } from '../infra-proto/gen-proto/pointcloud_pb'
import * as THREE from 'three'

import * as PC from '../infra-proto/gen-proto/pointcloud_pb'


export function fromGRPC(grpc_cloud: PC.PointCloud): THREE.Points
{
    let positions:Array<number> = [];
    let colors:Array<number> = [];

    for (let i = 0; i < grpc_cloud.getPointsList().length; i+=3)
    {
        positions[i] = grpc_cloud.getPointsList()[i].getX()
        positions[i+1] = grpc_cloud.getPointsList()[i].getY()
        positions[i+2] = grpc_cloud.getPointsList()[i].getZ()
        
        colors[i] = grpc_cloud.getPointsList()[i].getR() / 255
        colors[i+1] = grpc_cloud.getPointsList()[i].getG() / 255
        colors[i+2] = grpc_cloud.getPointsList()[i].getB() / 255
    }

    var geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', 
    new THREE.Float32BufferAttribute(positions,3))
    geometry.setAttribute('color', 
    new THREE.Float32BufferAttribute(colors, 3))
    var material = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true
    })

    return new THREE.Points(geometry, material)
}

export function toGRPC(three_cloud: THREE.Points): PC.PointCloud | undefined
{
    if(!three_cloud)
    {
        console.error('toGRPC:: Empty cloud.')
        return;
    }
    const coordinates = three_cloud.geometry.getAttribute('position') as THREE.BufferAttribute
    const color = three_cloud.geometry.getAttribute('color') as THREE.BufferAttribute
    console.log('Converting ', coordinates.count, 'points... ')

    const retCloud = new PC.PointCloud();

    for (let i = 0; i < coordinates.count; i++) {
        // Print x values.
        const point = new PC.Point()
        point.setX(coordinates.getX(i))
        point.setY(coordinates.getY(i))
        point.setZ(coordinates.getZ(i))
        const normalized_r = Math.floor(color.getX(i) * 255)
        const normalized_g = Math.floor(color.getY(i) * 255)
        const normalized_b = Math.floor(color.getZ(i) * 255)
        point.setR(normalized_r)
        point.setG(normalized_g)
        point.setB(normalized_b)
        retCloud.addPoints(point)
      }

      console.log('Done!')

      return retCloud;
}