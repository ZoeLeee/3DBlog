import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './styles/index.less';
import { Viewer } from "./View/Viewer";
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export let viewer: Viewer;

window.onresize = () => {
    if (viewer)
        viewer.OnSize();
};

ReactDOM.render(<App />, document.getElementById("root"), () => {
    let el = document.getElementById("main");
    if (el)
        viewer = new Viewer(el);
    if (viewer) {
        const geometry = new BoxGeometry(100, 100, 100);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Mesh(geometry, material);
        // viewer.Scene.add(cube);
    }
});