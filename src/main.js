import RippleEffect from './ripple-effect.js';
import { GUI } from './../three.js-master/examples/jsm/libs/dat.gui.module.js';

// const gui = new GUI();

// gui.add(params, 'pixelSize').min(2).max(32).step(2);
// gui.add(params, 'speedIn').min(2).max(32).step(2);
// gui.add(params, 'speedOut').min(2).max(32).step(2);
// gui.add(params, 'intensity').min(2).max(32).step(2);
// gui.add(params, 'waveSpeed').min(0.0001).max(10).step(2);
// gui.add(params, 'strength').min(2).max(32).step(2);
// gui.add(params, 'area').min(2).max(32).step(2);

let params = {
    pixelSize: 1,
    speedIn: 1,
    speedOut: 2,
    intensity: 1,
    waveSpeed: 0.001,
    strength: 1,
    area: 1,
};

let images = {
    textures: {
        texture1: './imgs/ememem01.jpg',
        texture2: './imgs/ememem02.jpg',
        texture3: './imgs/ememem03.jpg',
        texture4: './imgs/ememem04.jpg',
        texture5: './imgs/ememem05.jpg',
        texture6: './imgs/ememem05.jpg',
    },
    dimensions: {
        texture1: {
            offsetWidth: 430,
            offsetHeight: 381
        },
        texture2: {
            offsetWidth: 430,
            offsetHeight: 381
        },
        texture3: {
            offsetWidth: 430,
            offsetHeight: 381
        },
        texture4: {
            offsetWidth: 430,
            offsetHeight: 381
        },
        texture5: {
            offsetWidth: 430,
            offsetHeight: 381
        },
        texture6: {
            offsetWidth: 430,
            offsetHeight: 381
        },
    },
    parents: {
        texture1: document.querySelector('.div1'),
        texture2: document.querySelector('.div2'),
        texture3: document.querySelector('.div3'),
        texture4: document.querySelector('.div4'),
        texture5: document.querySelector('.div5'),
        texture6: document.querySelector('.div6'),
    }
};

const ripple1 = new RippleEffect({ images });