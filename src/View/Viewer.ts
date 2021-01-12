import { CDN_URL } from "@/utils/Host";
import { AmbientLight, AxesHelper, Color, DataTexture, DirectionalLight, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, OrthographicCamera, PerspectiveCamera, PlaneBufferGeometry, PointLight, ReinhardToneMapping, Scene, Texture, TextureDataType, UnsignedByteType, Vector2, Vector3, WebGLRenderer } from "three";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { LoadHDR } from "@/utils/Loader";

const CDNHOST = "https://cdn.jsdelivr.net/gh/ZoeLeee/cdn/";

const gtlfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(CDNHOST + "script/");

gtlfLoader.setDRACOLoader(dracoLoader);
const Width = 32;

export class Viewer {
    Renderer: WebGLRenderer = new WebGLRenderer(
        {
            antialias: true,//antialias:true/false是否开启反锯齿
            precision: "highp",//precision:highp/mediump/lowp着色精度选择
            alpha: false,//alpha:true/false是否可以设置背景色透明
            logarithmicDepthBuffer: true,
        }
    );
    private _Scene = new Scene();
    private _Camera: PerspectiveCamera;
    private _Width: number;
    private _Height: number;
    private _container: HTMLElement;
    private frontlight = new DirectionalLight(16711680, .5);
    private backlight = new DirectionalLight(65280, .5);
    constructor(container: HTMLElement) {
        this._Width = container.clientWidth;
        this._Height = container.clientHeight;
        this._container = container;

        //校验.成为2的倍数 避免外轮廓错误.
        if (this._Width % 2 === 1)
            this._Width -= 1;
        if (this._Height % 2 === 1)
            this._Height -= 1;
        this.InitCamera();
        this.InitScene();
        this.InitLight();
        this.InitRender(container);

        let axes = new AxesHelper(100);
        this._Scene.add(axes);

        this.StartRender();

        let control = new OrbitControls(this._Camera, this.Renderer.domElement);

        //@ts-ignore
        window["viewer"] = this;
    }
    get Scene() {
        return this._Scene;
    }
    InitRender(canvasContainer: HTMLElement) {
        //加到画布
        canvasContainer.appendChild(this.Renderer.domElement);

        this.Renderer.autoClear = true;
        this.Renderer.sortObjects = false;
        this.Renderer.setPixelRatio(window.devicePixelRatio),
            //如果设置，那么它希望所有的纹理和颜色都是预乘的伽玛。默认值为false。
            this.Renderer.shadowMap.enabled = true;
        this.Renderer.setPixelRatio(window.devicePixelRatio);

        this.Renderer.physicallyCorrectLights = true;

        //设置它的背景色为黑色
        this.Renderer.setClearColor(0x000000, 1);

        this.Renderer.toneMappingExposure = 1;
        this.Renderer.toneMapping = ReinhardToneMapping;

        this.OnSize(this._Width, this._Height);
    }
    InitLight() {
        let amlight = new AmbientLight(0x444444, 1);
        this.Scene.add(amlight);
        this.frontlight.position.set(4, 2, 0);
        this.backlight.position.set(-6, 2, 0);
        this._Scene.add(this.frontlight);
        this._Scene.add(this.backlight);
    }
    InitCamera() {
        this._Camera = new PerspectiveCamera(35, this._Width / this._Height, 0.1, 100);
        this._Camera.position.copy(new Vector3(0, 2, 3.3131));
        this._Camera.lookAt(0, .6, 0);
    }
    InitScene() {
        this._Scene.background = new Color(3359822);
        gtlfLoader.load(CDN_URL + 'scene.glb', async (gltf) => {
            var group = gltf.scene;
            for (let o of group.children as Mesh[]) {
                let url = CDN_URL + `${o.name}_baked.hdr`;
                switch (o.name) {
                    case "ChairPied":
                        url = CDN_URL + "Chair.Pied_baked.hdr";
                        break;
                    case "DeskDrawers":
                        url = CDN_URL + "Desk.Drawers_baked.hdr";
                        break;
                    case "DeskHandles":
                        url = "http://cdn3.dodream.top/Desk.Handles_baked.hdr?key=joelee";
                        break;
                    case "DeskTable":
                        url = CDN_URL + "Desk.Table_baked.hdr";
                        break;
                    case "ScreenFrame":
                        url = CDN_URL + "Screen.Frame_baked.hdr";
                        break;
                    default:
                        break;
                }
                if (!url) continue;
                let texture = await LoadHDR(url);
                if (texture)
                    o.material = new MeshPhysicalMaterial({ map: texture });
            }
            this.Scene.add(group);
        });
    }
    OnSize(width?: number, height?: number) {
        this._Width = width ?? this._container.clientWidth;
        this._Height = height ?? this._container.clientHeight;

        //校验.成为2的倍数 避免外轮廓错误.
        if (this._Width % 2 === 1)
            this._Width -= 1;
        if (this._Height % 2 === 1)
            this._Height -= 1;

        this.Renderer.setSize(this._Width, this._Height);

        this._Camera.updateProjectionMatrix();
    }
    StartRender = () => {
        requestAnimationFrame(this.StartRender);
        this.Render();
    };
    Render() {
        this.Renderer.render(this._Scene, this._Camera);
    }
}