import * as THREE from 'three'

/**
 * Description: A customized keyboard and mouse event listener for
 * smooth 3D navigation.
 * 
 * Author: Marcus Forte
 *
 *
 *
 * Usage:
 *	const controls = new DunaControls( camera, renderer.domElement)
 *
 */

export class DunaControls {
    // Required camera and DOM element.
    camera: THREE.PerspectiveCamera;
    domElement: HTMLCanvasElement;

    // Motion_keymap keeps track of pressed and 
    // relieved keys to enable smooth motion.
    motion_keymap: Map<string, boolean>;

    // Speed factor
    speed: number;

    private mouseClickStartCoords: THREE.Vector2;
    private isMouseClicked: boolean;

    constructor(camera: THREE.PerspectiveCamera, domElement: HTMLCanvasElement) {
        this.camera = camera;
        this.domElement = domElement;
        this.motion_keymap = new Map()
        this.speed = 0.3

        this.mouseClickStartCoords = new THREE.Vector2(0, 0)
        this.isMouseClicked = false;

        // Install event listeners
        document.addEventListener('keydown', this.keyDownHandler.bind(this))
        document.addEventListener('keyup', this.keyUpHandler.bind(this))

        document.addEventListener('mousedown', this.mouseDownHandler.bind(this))
        document.addEventListener('mouseup', this.mouseUpHandler.bind(this))
        document.addEventListener('mousemove', this.mouseMoveHandler.bind(this))
    }

    mouseDownHandler(event: MouseEvent) {
        this.mouseClickStartCoords.set(event.clientX, event.clientY)
        this.isMouseClicked = true
    }

    mouseUpHandler(event: MouseEvent) {
        this.isMouseClicked = false
    }

    mouseMoveHandler(event: MouseEvent) {
        // Computes diference between mouse drags.
        // TODO this does not run in update loop.

        var delta = new THREE.Vector2(event.clientX, event.clientY)
        delta = delta.sub(this.mouseClickStartCoords)
        if (this.isMouseClicked) {
            this.camera.rotateX(delta.y * 0.001)
            // this.camera.rotateOnWorldAxis({ x: 0, y: 1, z: 0 }, delta.x * 0.001) // REALSENSE
            this.camera.rotateOnWorldAxis(new THREE.Vector3(0,0,1), delta.x * 0.001)
            this.mouseClickStartCoords.set(event.clientX, event.clientY)
        }
    }

    keyDownHandler(event: KeyboardEvent) {
        // console.log('keydown: ', event.key)
        // filter some keys
        const filtered_key = event.key.toLowerCase()

        switch (filtered_key) {
            case 'r':
                console.log('reset')
                this.camera.position.set(10, 10, 10)
                this.camera.up.set(0, 0, 1)
                this.camera.lookAt(0, 0, 0)

            default:
                this.motion_keymap.set(filtered_key, true)
        }
    }

    private keyUpHandler(event: KeyboardEvent) {
        const filtered_key = event.key.toLowerCase()
        this.motion_keymap.delete(filtered_key)
    }

    update() {
        // Update camera poistion and view based on inputs.

        var factor = 1
        if (this.motion_keymap.has('shift')) {
            factor = 3;
        }

        var speed = factor * this.speed;
        if (this.motion_keymap.has('w')) {
            this.camera.translateZ(-speed)
        }
        if (this.motion_keymap.has('s')) {
            this.camera.translateZ(speed)
        }
        if (this.motion_keymap.has('a')) {
            this.camera.translateX(-speed)
        }
        if (this.motion_keymap.has('d')) {
            this.camera.translateX(speed)
        }
        if (this.motion_keymap.has('q')) {
            this.camera.translateY(speed)
        }
        if (this.motion_keymap.has('e')) {
            this.camera.translateY(-speed)
        }
    }
}