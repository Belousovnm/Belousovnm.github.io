import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64)

// Materials

const tilesBaseColor = textureLoader.load('/textures/Tiles_014_SD/0002.jpg')
const tilesNormalMap = textureLoader.load('/textures/Tiles_014_SD/n0002.jpg')
const tilesRoughnessMap = textureLoader.load('/textures/Tiles_014_SD/rough0002.jpg')
const tilesDisp = textureLoader.load('/textures/Tiles_014_SD/r0002.jpg')
const tilesOCC = textureLoader.load('/textures/Tiles_014_SD/occ0002.jpg')

const material = new THREE.MeshStandardMaterial()
material.map = tilesBaseColor;
material.normalMap = tilesNormalMap;
material.roughness = tilesRoughnessMap;
material.displacementMap = tilesDisp;
material.aoMap = tilesOCC;
// material.metalness = 0.7
// material.roughness = 0.2
// material.normalMap = normalTexture;
// material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Light1

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//Light2

const pointLight2 = new THREE.PointLight(0xbb6666, 2)
pointLight2.position.set(1.54,-1.08,0.37)
pointLight2.intensity = 5
scene.add(pointLight2)

const light1 = gui.addFolder('Light 1')

light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper2)


//Light3

const pointLight3 = new THREE.PointLight(0x33aaff, 2)
pointLight3.position.set(-6,0.11,-3)
pointLight3.intensity = 5
scene.add(pointLight3)

const light2 = gui.addFolder('Light 2')

light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0x33aaff
}

light2.addColor(light2Color, 'color')
    .onChange(() => {
	pointLight3.color.set(light2Color.color)
    })


// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper3)


//Light4

const pointLight4 = new THREE.PointLight(0xA06E8C, 2)
pointLight4.position.set(4,4,-0.59)
pointLight4.intensity = 2.5
scene.add(pointLight4)

const light3 = gui.addFolder('Light 3')

light3.add(pointLight4.position, 'y').min(-3).max(3).step(0.01)
light3.add(pointLight4.position, 'x').min(-6).max(6).step(0.01)
light3.add(pointLight4.position, 'z').min(-3).max(3).step(0.01)
light3.add(pointLight4, 'intensity').min(0).max(10).step(0.01)

const light3Color = {
    color: 0xA06E8C
}

light3.addColor(light3Color, 'color')
    .onChange(() => {
	pointLight4.color.set(light3Color.color)
    })
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

// document.addEventListener('mousemove', onDocumentMouseMove)

// let mouseX = 0;
// let mouseY = 0;

// let targetX = 0;
// let targetY = 0;

// const windowHalfX = window.innerWidth / 2;
// const windowHalfY = window.innerHeight / 2;

// function onDocumentMouseMove(event){
//     mouseX = (event.clientX - windowX)
//     mouseY = (event.clientY - windowY)
// }


const clock = new THREE.Clock()

const tick = () =>
{
    // targetX = mouseX * .001
    // targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .15 * elapsedTime


    // sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
