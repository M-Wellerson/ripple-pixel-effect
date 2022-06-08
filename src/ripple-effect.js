import * as THREE from './../three.js-master/build/three.module.js';
import { EffectComposer } from './../three.js-master/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './../three.js-master/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './../three.js-master/examples/jsm/postprocessing/ShaderPass.js';
import { PixelShader } from './../three.js-master/examples/jsm/shaders/PixelShader.js';
import { vertex } from './vertex.js';
import { fragment } from './fragment.js';

const RippleEffect = function (opts) {
    const rand = function (a, b) {
        return a + (b - a) * Math.random();
    };

    var group = new THREE.Group();

    let time = 0;
    let mouseOver = 0;
    let playhead = rand(1, 2);

    let parent = '';
    const intensity = opts.intensity || 1;
    const strength = opts.strength || 2;
    const area = opts.area || 6;
    const waveSpeed = opts.waveSpeed || 0.01;
    const speedIn = opts.speedIn || 1.4;
    const speedOut = opts.speedOut || 1.2;

    let texture = '';
    let easing = opts.easing || 'Expo.easeOut';

    const renderer = new THREE.WebGLRenderer({ antialias: false });
    const scene = new THREE.Scene();
    let composer = new EffectComposer(renderer);
    let mat = [];

    Object.keys(opts.images.textures).map(function (key, index) {
        let textureLoad = opts.images.textures[key] || console.error("no texture!");

        const camera = new THREE.OrthographicCamera(
            opts.images.dimensions[key].offsetWidth / -2,
            opts.images.dimensions[key].offsetWidth / 2,
            opts.images.dimensions[key].offsetHeight / 2,
            opts.images.dimensions[key].offsetHeight / -2,
            1,
            1000
        );

        camera.position.z = 1;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff, 0.0);
        renderer.setSize(opts.images.dimensions[key].offsetWidth, opts.images.dimensions[key].offsetHeight);
        opts.images.parents[key].appendChild(renderer.domElement);

        composer.addPass(new RenderPass(scene, camera));

        const pixelPass = new ShaderPass(PixelShader);
        pixelPass.uniforms['resolution'].value = new THREE.Vector2(window.innerWidth, window.innerHeight);
        pixelPass.uniforms['resolution'].value.multiplyScalar(window.devicePixelRatio);
        // pixelPass.uniforms['pixelSize'].value = 70;
        composer.addPass(pixelPass);
        
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "";
        texture = loader.load(textureLoad);

        texture.minFilter = THREE.LinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        mat = new THREE.ShaderMaterial({
            uniforms: {
                time: { type: 'f', value: 0 },
                image: { type: 't', value: texture },
                mouseOver: { type: 'f', value: mouseOver },
                intensity: { type: 'f', value: intensity * playhead },
                strength: { type: 'f', value: strength * playhead },
                area: { type: 'f', value: area * playhead },
                waveSpeed: { type: 'f', value: waveSpeed * playhead },
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
        });

        let geometry = new THREE.PlaneBufferGeometry(
            opts.images.dimensions[key].offsetWidth,
            opts.images.dimensions[key].offsetHeight,
            1
        );
        const group = new THREE.Group();

        group.add( new THREE.Mesh(geometry, mat) );

        scene.add(group);

        gsap.to(mat.uniforms.mouseOver, {
            duration: speedIn,
            value: 1,
            ease: easing
        });

        window.addEventListener("resize", function () {
            renderer.setSize(opts.images.dimensions[key].offsetWidth, opts.images.dimensions[key].offsetHeight);
        });
    });
    const animate = function () {
        time++;

        mat.uniforms.time.value = time;
        requestAnimationFrame(animate);
        composer.render();
    };
    animate();

};

export default RippleEffect;