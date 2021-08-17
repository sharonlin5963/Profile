import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xfff1cc)

// Objects
// ? 球體
const sphereGeometryR4 = new THREE.SphereGeometry(4, 32, 32)
const sphereGeometryR3 = new THREE.SphereGeometry(3, 32, 32)
// ? 甜甜圈
const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100)
// ? 圓柱
const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32)
const lineGeometry = new THREE.CylinderGeometry(0.3, 0.3, 8, 32)

// Materials

const pinkMaterial = new THREE.MeshLambertMaterial()
pinkMaterial.color = new THREE.Color(0xef90c2)

// Mesh
const deg = 3.1415 / 180
const sphereRight = new THREE.Mesh(sphereGeometryR4, pinkMaterial)
const sphereLeft = new THREE.Mesh(sphereGeometryR3, pinkMaterial)
const torus = new THREE.Mesh(torusGeometry, pinkMaterial)
const cylinder = new THREE.Mesh(cylinderGeometry, pinkMaterial)
const line = new THREE.Mesh(lineGeometry, pinkMaterial)
sphereRight.position.x = 20
sphereRight.position.y = 10
sphereLeft.position.x = -10
torus.position.x = -15
torus.position.y = 10
torus.rotation.x = 30 * deg
torus.rotation.y = -20 * deg
cylinder.position.x = 25
cylinder.rotation.x = 90 * deg
cylinder.rotation.z = 30 * deg
line.position.x = 10
line.position.y = -10
line.rotation.z = -60 * deg
scene.add(sphereRight)
scene.add(sphereLeft)
scene.add(torus)
scene.add(cylinder)
scene.add(line)

// Lights
const light = new THREE.AmbientLight(0x828282) // soft white light
scene.add(light)
const pointLight = new THREE.PointLight(0xffffff, 1, 100)
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 100, 0)
// camera.position.x = 0
// camera.position.y = 0
camera.position.z = 60
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// const gui = new dat.GUI()
const params = new function () {
  this.pointLightX = 0
  this.pointLightY = 0
  this.pointLightZ = 20
}()
// gui.add(params, 'pointLightX', 0, 100).name('pointLightX')
// gui.add(params, 'pointLightY', 0, 100).name('pointLightY')
// gui.add(params, 'pointLightZ', 0, 100).name('pointLightZ')

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

// const clock = new THREE.Clock()

const tick = () => {
  // const elapsedTime = clock.getElapsedTime()

  // Update objects
  // sphere.rotation.y = .5 * elapsedTime
  // sphere.width = params.boxWidth
  // sphere.scale.x = params.boxWidth
  pointLight.position.x = params.pointLightX
  pointLight.position.y = params.pointLightY
  pointLight.position.z = params.pointLightZ

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
