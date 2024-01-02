import {
  BoxGeometry,
  Mesh,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  Object3D,
} from "three";

export default class PlainGeometry {
  constructor() {
    this.plainObj = new Object3D();

    this.geo = new BoxGeometry(40, 0.1, 40);
    this.material = new MeshNormalMaterial();

    this.plainMesh = new Mesh(this.geo, this.material);
    this.plainObj.add(this.plainMesh);
    this.plainMesh.position.set(0, -1, 0);

    this.plain = this.plainObj;
  }
}