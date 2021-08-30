import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'

//* Canvas
const canvas = document.querySelector('canvas.webgl')

//* Sizes
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

//* Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x211945)

//* Objects
// ? 球體
const sphereGeometryR4 = new THREE.SphereGeometry(4, 32, 32)
const sphereGeometryR16 = new THREE.SphereGeometry(16, 32, 32)
const sphereGeometryR8 = new THREE.SphereGeometry(8, 32, 32)
// ? 甜甜圈
const torusGeometryThinR25 = new THREE.TorusGeometry(25, 0.5, 16, 100)
const torusGeometryThinR10 = new THREE.TorusGeometry(10, 0.5, 16, 100)
const torusGeometryThinR5 = new THREE.TorusGeometry(5, 0.2, 16, 100)
const torusGeometryThinR2 = new THREE.TorusGeometry(2, 0.5, 16, 100)

//* Materials
const pinkMaterial = new THREE.MeshPhongMaterial()
pinkMaterial.color = new THREE.Color(0x9a63c9)
pinkMaterial.shininess = 80
const blueMaterial = new THREE.MeshPhongMaterial()
blueMaterial.color = new THREE.Color(0xb7baf7)
blueMaterial.flatShading = true

//* Mesh
let sphereMiddle, torusUpperRight, sphereLowerRight, torusLowerLeft, sphereUpperRight
if (sizes.width <= 1024) {
  sphereMiddle = new THREE.Mesh(sphereGeometryR4, blueMaterial)
  torusUpperRight = new THREE.Mesh(torusGeometryThinR10, pinkMaterial)
  torusLowerLeft = new THREE.Mesh(torusGeometryThinR5, pinkMaterial)
  const torusLower = new THREE.Mesh(torusGeometryThinR2, pinkMaterial)
  torusLowerLeft.position.set(-18, -4, 0)
  torusLower.position.set(0, -10, 0)
  sphereMiddle.position.set(-12, 9, 0)
  scene.add(torusLowerLeft)
  scene.add(torusLower)
} else {
  sphereLowerRight = new THREE.Mesh(sphereGeometryR4, pinkMaterial)
  torusLowerLeft = new THREE.Mesh(torusGeometryThinR10, pinkMaterial)
  sphereUpperRight = new THREE.Mesh(sphereGeometryR8, pinkMaterial)
  sphereMiddle = new THREE.Mesh(sphereGeometryR16, blueMaterial)
  torusUpperRight = new THREE.Mesh(torusGeometryThinR25, pinkMaterial)
  torusLowerLeft.position.set(-40, -25, 0)
  sphereLowerRight.position.set(28, -10, 0)
  sphereUpperRight.position.set(30, 10, 0)
  sphereMiddle.position.set(-10, 0, 0)
  scene.add(torusLowerLeft)
  scene.add(sphereLowerRight)
  scene.add(sphereUpperRight)
}
//* position
torusUpperRight.position.set(10, 5, 0)

scene.add(sphereMiddle)
scene.add(torusUpperRight)

//* Lights
const light = new THREE.AmbientLight(0x828282) // soft white light
scene.add(light)
const pointLight = new THREE.PointLight(0xffffff, 1, 100)
scene.add(pointLight)
const pointLightPink = new THREE.PointLight(0x85ffeb, 1, 100)
scene.add(pointLightPink)
pointLightPink.position.set(20, -15, 10)
const pointLightBlue = new THREE.PointLight(0x394eed, 1.5, 100)
scene.add(pointLightBlue)
pointLightBlue.position.set(-18, -10, 30)
const pointLightPurple = new THREE.PointLight(0x901ff2, 1.5, 100)
scene.add(pointLightPurple)
pointLightPurple.position.set(10, 30, 30)

//* Camera
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 200, 0)
camera.position.z = 60
scene.add(camera)

//* Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
// const gui = new dat.GUI()
// const params = new function () {
//   this.pointLightX = 0
//   this.pointLightY = 0
//   this.pointLightZ = 20
// }()
// gui.add(params, 'pointLightX', 0, 100).name('pointLightX')
// gui.add(params, 'pointLightY', 0, 100).name('pointLightY')
// gui.add(params, 'pointLightZ', 0, 100).name('pointLightZ')

//* Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//* Animate

const clock = new THREE.Clock()
const mouse = {
  x: 0,
  y: 0
}
const clientWidth = window.innerWidth / 2
window.addEventListener('mousemove', (event) => {
  mouse.x = event.pageX
  mouse.y = event.pageY
})
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  const mouseOffset = mouse.x - clientWidth
  const deg = 3.1415 / 180

  // Update objects
  const directionY = (mouseOffset < 0) ? -1 : 1
  sphereMiddle.rotation.y = directionY * 0.6 * elapsedTime

  if (sizes.width > 1024) {
    const rate = mouseOffset * 0.003
    sphereLowerRight.position.x = 28 - rate
    sphereUpperRight.position.x = 30 + rate
    torusLowerLeft.position.x = -40 - rate
    torusUpperRight.rotation.y = mouseOffset * 0.02 * deg
  }
  // light
  // pointLight.position.x = params.pointLightX
  // pointLight.position.y = params.pointLightY
  // pointLight.position.z = params.pointLightZ

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
