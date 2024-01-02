import {
  BoxGeometry,
  IcosahedronGeometry,
  MeshNormalMaterial,
  Mesh,
} from "three";
import HexGeometry from "../js3D/Hex3D";
import PlainGeometry from "../js3D/Plain";

export default class Ico {
  constructor(scene) {
    this.scene = scene;

    this.mesh = new HexGeometry().hex;
    this.scene.add(this.mesh);

    this.plain = new PlainGeometry().plain;
    this.scene.add(this.plain);
  }
}