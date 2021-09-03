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
const sphereGeometryR2 = new THREE.SphereGeometry(2.8, 32, 32)
const sphereGeometryR4 = new THREE.SphereGeometry(4, 32, 32)
const sphereGeometryR16 = new THREE.SphereGeometry(16, 32, 32)
const sphereGeometryR6 = new THREE.SphereGeometry(6, 32, 32)
// ? 甜甜圈
const torusGeometryThinR25 = new THREE.TorusGeometry(25, 0.5, 16, 100)
const torusGeometryThinR10 = new THREE.TorusGeometry(10, 0.5, 16, 100)
const torusGeometryThinR2 = new THREE.TorusGeometry(2, 0.5, 16, 100)

//* Materials
const purpleMaterial = new THREE.MeshPhongMaterial()
purpleMaterial.color = new THREE.Color(0x9a63c9)
purpleMaterial.shininess = 80
const greenMaterial = new THREE.MeshPhongMaterial()
greenMaterial.color = new THREE.Color(0x85ffeb)
greenMaterial.shininess = 80
const blueMaterial = new THREE.MeshPhongMaterial()
blueMaterial.color = new THREE.Color(0x4d61ff)

const mainMaterial = new THREE.MeshPhongMaterial()
mainMaterial.color = new THREE.Color(0xb7baf7) // a1a5f7
mainMaterial.flatShading = true

//* Mesh
let sphereMiddle, torusUpperRight, sphereLowerRight, torusLowerLeft, sphereUpperRight, sphereMiddleLeft, sphereUpperLeft
if (sizes.width <= 1024) {
  sphereMiddle = new THREE.Mesh(sphereGeometryR4, mainMaterial)
  torusUpperRight = new THREE.Mesh(torusGeometryThinR10, purpleMaterial)
  const torusLower = new THREE.Mesh(torusGeometryThinR2, blueMaterial)
  sphereMiddleLeft = new THREE.Mesh(sphereGeometryR2, blueMaterial)
  sphereLowerRight = new THREE.Mesh(sphereGeometryR2, greenMaterial)
  sphereUpperLeft = new THREE.Mesh(sphereGeometryR2, greenMaterial)
  torusLower.position.set(-7, -12, 0)
  sphereMiddle.position.set(0, 0, 20)
  sphereMiddleLeft.position.set(-13, 3, 0)
  torusUpperRight.position.set(10, 2, 0)
  sphereLowerRight.position.set(13, -11, -20)
  sphereUpperLeft.position.set(-18, 22, -80)
  scene.add(torusLower)
  scene.add(sphereUpperLeft)
} else {
  sphereLowerRight = new THREE.Mesh(sphereGeometryR4, greenMaterial)
  torusLowerLeft = new THREE.Mesh(torusGeometryThinR10, blueMaterial)
  sphereUpperRight = new THREE.Mesh(sphereGeometryR6, purpleMaterial)
  sphereMiddle = new THREE.Mesh(sphereGeometryR16, mainMaterial)
  sphereMiddleLeft = new THREE.Mesh(sphereGeometryR2, blueMaterial)
  torusUpperRight = new THREE.Mesh(torusGeometryThinR25, purpleMaterial)
  torusLowerLeft.position.set(-40, -25, 0)
  sphereLowerRight.position.set(28, -10, 0)
  sphereUpperRight.position.set(30, 10, 0)
  sphereMiddle.position.set(-10, 0, 0)
  sphereMiddleLeft.position.set(-35, 12, 0)
  torusUpperRight.position.set(10, 5, 0)
  scene.add(torusLowerLeft)
  scene.add(sphereUpperRight)
}

scene.add(sphereMiddle)
scene.add(torusUpperRight)
scene.add(sphereMiddleLeft)
scene.add(sphereLowerRight)

//* Lights
const light = new THREE.AmbientLight(0x828282) // soft white light
scene.add(light)
const pointLight = new THREE.PointLight(0xffffff, 1, 100)
scene.add(pointLight)
const greenLight = new THREE.PointLight(0x85ffeb, 1, 100)
scene.add(greenLight)
greenLight.position.set(20, -15, 10)
const blueLight = new THREE.PointLight(0x394eed, 1.5, 100)
scene.add(blueLight)
blueLight.position.set(-18, 5, 28)
const purpleLight = new THREE.PointLight(0x901ff2, 1.5, 100)
scene.add(purpleLight)
purpleLight.position.set(10, 30, 30)

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
    sphereLowerRight.position.y = -10 - rate
    sphereUpperRight.position.x = 30 + rate
    torusLowerLeft.position.x = -40 - rate
    sphereMiddleLeft.position.x = -35 + rate
    torusUpperRight.rotation.y = mouseOffset * 0.02 * deg

    greenLight.position.y = -15 - rate * 5
    purpleLight.position.x = 10 + rate * 10
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
