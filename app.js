import Obj from "./obj.js";
import * as Three from './three.module.js'
import Viewier from "./Viewier.js";

export default class App {
    constructor() {
        this.viewier = new Viewier({
            renderer: {
                parent: document.body,
                antialias: true,
                alpha: true,
                clearColor: 'grey',
                pixelRatio: 1
            }
        })
        this.createObject()
    }


    createObject() {
        this.object = new Three.Mesh(
            new Three.BoxGeometry(.1, .1, 1),
            new Three.MeshStandardMaterial({ color: "gray" })
        )
        this.viewier.scene.add(this.object)



        this.viewier.addUpdate('objRotate', () => this.object.rotation.y -= .01)

        const cone = new Three.Mesh(
            new Three.ConeGeometry(.1, .2, 8),
            new Three.MeshStandardMaterial({ color: 'red' })
        )

        cone.position.z = .6
        cone.rotation.x = Math.PI / 2
        this.object.add(cone)

        const object2 = this.object.clone()
        object2.position.x += 3
        this.viewier.scene.add(object2)

        const sphere = new Three.Mesh(
            new Three.SphereGeometry(.5, 8, 8),
            new Three.MeshStandardMaterial({ color: 'green' })
        )
        sphere.position.set(5, 0, -6)
        this.viewier.scene.add(sphere)

        this.viewier.addUpdate('lookAtSphere', () => {
            sphere.position.x -= .05
            object2.lookAt(sphere.position)
        })
    }




}