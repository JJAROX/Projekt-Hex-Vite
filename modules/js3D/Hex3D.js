import { BoxGeometry, Mesh, MeshMatcapMaterial, Object3D } from "three";
export default class HexGeometry {
  constructor() {
    this.geo = new BoxGeometry(3 * (2 / Math.sqrt(3)), 2, 0.4);
    this.material = new MeshMatcapMaterial();

    this.hexObj = new Object3D();

    this.mesh = new Mesh(this.geo, this.material);
    for (let i = 0; i < 6; i++) {
      let side = this.mesh.clone();
      if (i == 3 || i == 0) {
        let wallObj = new Object3D();
        let shWallGeo = new BoxGeometry(2 / Math.sqrt(3), 2, 0.4);

        let shWallMesh1 = new Mesh(shWallGeo, this.material);
        let shWallMesh2 = new Mesh(shWallGeo, this.material);
        wallObj.add(shWallMesh1);
        shWallMesh1.position.set(2 / Math.sqrt(3), 0, 0);
        wallObj.add(shWallMesh2);
        shWallMesh2.position.set(-(2 / Math.sqrt(3)), 0, 0);
        side = wallObj;
      }
      let angle_deg = 60 * i + 30;
      let angle_rad = (Math.PI / 180) * angle_deg;

      side.position.x = 3 * Math.cos(angle_rad); // punkt na okręgu, do obliczenia
      side.position.z = 3 * Math.sin(angle_rad); // punkt na okręgu, do obliczenia
      side.lookAt(this.hexObj.position); // nakierowanie ściany na środek kontenera 3D
      this.hexObj.add(side); // dodanie ściany do kontenera
    }

    // this.mesh1.position.set(1.7, 0, 0);

    // this.hexObj.add(this.mesh1);

    this.hex = this.hexObj;
  }
}