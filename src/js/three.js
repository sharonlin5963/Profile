import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x211945)

// Objects
// ? 球體
const sphereGeometryR4 = new THREE.SphereGeometry(4, 32, 32)
const sphereGeometryR16 = new THREE.SphereGeometry(16, 32, 32)
const sphereGeometryR10 = new THREE.SphereGeometry(10, 32, 32)
// ? 甜甜圈
const torusGeometryThinR25 = new THREE.TorusGeometry(25, 0.5, 16, 100)
const torusGeometryThinR20 = new THREE.TorusGeometry(20, 0.5, 16, 100)
const torusGeometryThickR20 = new THREE.TorusGeometry(20, 3, 16, 100)
const torusGeometryThickR25 = new THREE.TorusGeometry(25, 4, 16, 100)

// Materials

const pinkMaterial = new THREE.MeshPhongMaterial()
pinkMaterial.color = new THREE.Color(0xa55ce6)
pinkMaterial.shininess = 80
const blueMaterial = new THREE.MeshPhongMaterial()
blueMaterial.color = new THREE.Color(0xb7baf7)
blueMaterial.flatShading = true

// Mesh
// const deg = 3.1415 / 180
const sphereLowerRight = new THREE.Mesh(sphereGeometryR4, pinkMaterial)
const sphereMiddle = new THREE.Mesh(sphereGeometryR16, blueMaterial)
const torusUpperRight = new THREE.Mesh(torusGeometryThinR25, pinkMaterial)
const torusLowerLeft = new THREE.Mesh(torusGeometryThinR20, pinkMaterial)
const torusUpperLeft = new THREE.Mesh(torusGeometryThickR20, pinkMaterial)
const torusLowerRight = new THREE.Mesh(torusGeometryThickR25, pinkMaterial)
const sphereUpperRight = new THREE.Mesh(sphereGeometryR10, pinkMaterial)

scene.add(sphereLowerRight)
scene.add(sphereMiddle)
scene.add(torusUpperRight)
scene.add(torusLowerLeft)
scene.add(torusUpperLeft)
scene.add(torusLowerRight)
scene.add(sphereUpperRight)

// Lights
const light = new THREE.AmbientLight(0x828282) // soft white light
scene.add(light)
const pointLight = new THREE.PointLight(0xffffff, 1, 100)
scene.add(pointLight)
const pointLightGreen = new THREE.PointLight(0x00f080, 1, 100)
scene.add(pointLightGreen)
pointLightGreen.position.set(10, -15, 5)
const pointLightOrange = new THREE.PointLight(0xff6a00, 1.5, 100)
scene.add(pointLightOrange)
pointLightOrange.position.set(-30, 20, 0)

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

// position
const windowWidth = (sizes.width >= 1440) ? 1440 : sizes.width
const percent = windowWidth / 1440
sphereLowerRight.position.set(28 * percent, -18 * percent, 2 * percent)
sphereMiddle.position.set(-10 * percent, 0 * percent, -10 * percent)
sphereUpperRight.position.set(30 * percent, 27 * percent, -5 * percent)
torusUpperRight.position.set(35 * percent, 15 * percent, -8 * percent)
torusLowerLeft.position.set(-35 * percent, -35 * percent, -12 * percent)
torusUpperLeft.position.set(-60 * percent, 30 * percent, -30 * percent)
torusLowerRight.position.set(35 * percent, -30 * percent, 0 * percent)

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

const clock = new THREE.Clock()
const mouse = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
  mouse.x = event.pageX
  mouse.y = event.pageY
})

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphereMiddle.rotation.y = 0.5 * elapsedTime
  // sphere.width = params.boxWidth
  // sphere.scale.x = params.boxWidth
  pointLight.position.x = params.pointLightX
  pointLight.position.y = params.pointLightY
  pointLight.position.z = params.pointLightZ
  const clientWidth = window.innerWidth / 2
  const clientHeight = window.innerHeight / 2
  const deg = 3.1415 / 180
  sphereLowerRight.position.x = 28 - (mouse.x - clientWidth) * 0.001
  torusLowerRight.position.y = -30 - (clientHeight - mouse.y) * 0.001

  sphereUpperRight.position.x = 30 + (mouse.x - clientWidth) * 0.001
  // torusUpperRight.position.x = 35 + (mouse.x - clientWidth) * 0.001
  torusLowerLeft.position.x = -35 - (mouse.x - clientWidth) * 0.001
  torusUpperLeft.rotation.y = 10 + (mouse.x - clientWidth) / 60 * deg
  torusUpperLeft.position.y = 30 + (clientWidth - mouse.y) * 0.001

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
