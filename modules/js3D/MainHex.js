import { Scene } from "three";
import Renderer from "../js3D/Renderer";
import Camera from "../js3D/Camera";
import Ico from "../js3D/Ico";

const container = document.getElementById("root");
const scene = new Scene();
const renderer = new Renderer(scene, container);
const camera = new Camera(renderer.threeRenderer);
const ico = new Ico(scene);

const GameObject = {
  render() {
    renderer.render(scene, camera.threeCamera);
    requestAnimationFrame(GameObject.render);
  },
};
export { GameObject };