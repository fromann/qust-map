const width = window.innerWidth, height = window.innerHeight // 屏幕宽高
const radius = 50 // 球体半径

// 第一步：创建场景
const scene = new THREE.Scene()

// 第二步：绘制一个球体
const geometry = new THREE.SphereBufferGeometry(radius, 32, 32)
geometry.scale(-1, 1, 1) // 球面反转，由外表面改成内表面贴图
const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./img/1.jpg') // 下载上面的全景图片到./img目录下
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// 第三步：创建相机，并确定相机位置
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
camera.position.x = 0  // 确定相机位置移到球心
camera.position.y = 0
camera.position.z = 0

camera.target = new THREE.Vector3(radius, 0, 0) // 设置一个对焦点


// 第四步：拍照并绘制到canvas
const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height) // 设置照片大小

document.querySelector('#wrap').appendChild(renderer.domElement) // 绘制到canvas
renderer.render(scene, camera)

let lat = 0, lon = 0

function render() {
    lon += 0.003 // 每帧加一个偏移量
    // 改变相机的对焦点，计算公式参考：2.2.2章节
    camera.target.x = radius * Math.cos(lat) * Math.cos(lon);
    camera.target.y = radius * Math.sin(lat);
    camera.target.z = radius * Math.cos(lat) * Math.sin(lon)
    camera.lookAt(camera.target) // 对焦

    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()
