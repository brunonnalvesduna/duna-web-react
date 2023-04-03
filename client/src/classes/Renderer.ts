import * as THREE from 'three'
import { DunaControls } from './dunaControls'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js'
// import * as path from 'path';
export class Renderer {

    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    controls: DunaControls | TrackballControls;


    loader: PLYLoader;

    // Base URL for fetching point clouds models. Points to the server/asset where user clouds are uploaded to.
    clouds_base_url: URL = new URL('http://localhost:5174/clouds/')
    loaded_model: THREE.Points;

    constructor() {

        /* Define Scene */
        this.scene = new THREE.Scene()
        this.clearPointClouds()

        this.loaded_model = new THREE.Points;

        /* Define Camera */
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )

        this.camera.position.set(-10, -10, 1)
        this.camera.up.set(0, 0, 1)
        this.camera.lookAt(0, 0, 0) // REALSENSE

        this.loader = new PLYLoader();

        console.log(window.navigator.userAgent)

        /* Define Rendeder */
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        // document.body.appendChild(this.renderer.domElement)

        /* Define Controls */
        if (!this.isMobile())
            this.controls = new DunaControls(this.camera, this.renderer.domElement)
        else
            this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        window.addEventListener('resize', this.onWindowResize.bind(this), false)

        this.renderer.setAnimationLoop(this.animationLoop.bind(this))

        console.log('ready!')
    }

    domElement() {
        return this.renderer.domElement
    }

    isMobile(): boolean {

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            return true;
        else
            return false
    }

    clearPointClouds() {
        this.scene.clear()
        this.scene.add(new THREE.AxesHelper(1))
    }

    renderLoadedModel() {
        this.clearPointClouds()
        this.scene.add(this.loaded_model)
    }
    renderSingeCloud(points: THREE.Points) {
        this.clearPointClouds()
        this.scene.add(points)
    }

    async loadCloudFromURL(url: string) {
        try {
            let geometry = await this.loader.loadAsync(url, (xhr: any) => {
                console.log(xhr.loaded / xhr.total * 100 + '% loaded');
            })

            this.loaded_model = new THREE.Points(
                geometry,
                new THREE.PointsMaterial(
                    {
                        size: 0.02,
                        vertexColors: true
                    }
                )
            )
            console.log('Model loaded.')

        } catch (error) {
            console.error(error)
        }
    }

    async loadCloudFile(model_name: string)
    // Set the point cloud to be loaded.
    {
        const model_path = this.clouds_base_url.toString() + '/' + model_name
        console.log('Loading model: ', model_path)

        try {
            let geometry = await this.loader.loadAsync(model_path, (xhr: any) => {
                console.log(xhr.loaded / xhr.total * 100 + '% loaded');
            })

            this.loaded_model = new THREE.Points(
                geometry,
                new THREE.PointsMaterial(
                    {
                        size: 0.02,
                        vertexColors: true
                    }
                )
            )
            console.log('Model loaded.')

        } catch (error) {
            console.error(error)
        }
    }

    getLoadedModel(): THREE.Points {
        return this.loaded_model;
    }
    animationLoop() {
        this.controls.update()

        this.camera.updateMatrix()
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
}