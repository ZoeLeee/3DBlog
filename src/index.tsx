import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './styles/index.less';
import { Viewer } from "./View/Viewer";
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Blog } from "./View/Main";

export let viewer: Viewer;
export let blog: Blog;
window.onresize = () => {
    if (viewer)
        viewer.OnSize();
};

ReactDOM.render(<App />, document.getElementById("root"), () => {
    let el = document.getElementById("main");
    if (el)
        viewer = new Viewer(el);
    if (viewer) {
        blog = new Blog(viewer);
    }
});