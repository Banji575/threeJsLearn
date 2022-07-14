import * as Three from './three.module.js'

export default class Viewier {
    constructor(options) {

        this.createResize()
        this.scene = new Three.Scene()
        this.createRenderer(options.renderer)
        this.createCamera()
        this.createLight()
        this.update()
    }

    createRenderer(settings) {
        if (this.renderer) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
            this.renderer.dispose()
        }
        console.log(settings)
        this.renderer = new Three.WebGLRenderer(settings);
        settings.parent.appendChild(this.renderer.domElement)


        this.renderer.setClearColor(settings.clearColor || "black")
        this.renderer.setPixelRatio(settings.pixelRatio || devicePixelRatio)

        this.renderer.setSize(settings.parent.offsetWidth, settings.parent.offsetHeight)
        this.addResize('resiseRender', () => {
            this.renderer.setSize(this.renderer.domElement.parentNode.offsetWidth, this.renderer.domElement.parentNode.offsetHeight)
            this.camera.updateProjectionMatrix()
        })
    }

    createCamera() {
        this.camera = new Three.PerspectiveCamera(
            45,
            this.renderer.domElement.offsetWidth / this.renderer.domElement.offsetHeight,
            1,
            100)
        this.camera.position.set(5, 10, 10)
        this.camera.lookAt(0, 0, 0)
        this.addResize('resizeCamera', () => this.camera.aspect = this.renderer.domElement.offsetWidth / this.renderer.domElement.offsetHeight)
    }

    createLight() {
        this.light = new Three.DirectionalLight(0xffffff, .5)
        this.scene.add(this.light)
        this.light.position.set(-1, 3, 10)

        this.light2 = new Three.AmbientLight(0xffffff, .5)
        this.scene.add(this.light2)
    }

    resizePool = {}

    poolUpdate = {}

    createResize() {
        window.addEventListener('resize', () => this.resize())

    }

    addResize(name, func) {
        this.resizePool[name] = func
    }

    resize() {
        for (let key in this.resizePool) this.resizePool[key]()
    }
    removeResize(key) {
        delete this.resizePool[key]
    }

    addUpdate(name, func) {
        this.poolUpdate[name] = func
    }

    removePoolUpdate(name) {
        delete this.poolUpdate[name]
    }

    update() {
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(() => this.update())


        for (let key in this.poolUpdate) this.poolUpdate[key]()

    }
}