/*
| -----------------------------------------------------------------------------
| funciones
| -----------------------------------------------------------------------------
*/

/**
 * 
 * @param {Function} funcion 
 * @param {Number} a 
 * @param {Number} b 
 * @param {Number} c 
 * @param {Number} d 
 * @param {Number} particionesX 
 * @param {Number} particionesY 
 */
function calcularIntegral(funcion, a, b, c, d, particionesX, particionesY) {
    let volumenes = [];
    let puntoX, puntoY;
    const deltaX = (b - a) / particionesX;
    const deltaY = (d - c) / particionesY;

    for (i = 0; i < particionesX; i++) {
        puntoX = a - 0 + (deltaX * i) + (deltaX / 2);

        for (j = 0; j < particionesY; j++) {
            puntoY =  c - 0 + (deltaY * j) + (deltaY / 2);
            volumenes.push(deltaX * deltaY * funcion(puntoX, puntoY));
        }
    }

    return volumenes.reduce((suma, volumen) => suma + volumen, 0);
}

/*
| -----------------------------------------------------------------------------
| declaraciones 
| -----------------------------------------------------------------------------
*/

const inputA = document.getElementById('input-a');
const inputB = document.getElementById('input-b');
const inputC = document.getElementById('input-c');
const inputD = document.getElementById('input-d');
const partsX = document.getElementById('parts-x');
const partsY = document.getElementById('parts-y');

const pResult = document.getElementById('result');
const btn = document.getElementById('calculate');

const funct1 = document.querySelector("#funct-func1");
const funct2 = document.querySelector("#funct-func2");


const obtainFunc = () => {
    let funct = document.querySelectorAll("input[type=radio][name=funct]");

    funct = Array.from(funct).filter((i) => i.checked);
    funct = funct[0] ?? funct1;

    let func = null;

    console.log(funct);

    switch (funct) {
        case funct1:
            func = (x, y) => (x**2 + y**2);
            break;

        case funct2:
            func = (x, y) => (2*x + y);
            break
    
        default:
            func = (x, y) => (x**2 + y**2);
            break;
    }

    return func;
};

btn.onclick = () => {
    // console.log(
    //     calcularIntegral(
    //         // (x, y) => x**2 + y**2,
    //         obtainFunc(),
    //         inputA.value,
    //         inputB.value,
    //         inputC.value,
    //         inputD.value,
    //         partsX.value,
    //         partsY.value
    //     )
    // );

    pResult.innerText = "Resultado = " + calcularIntegral(
        obtainFunc(),
        inputA.value,
        inputB.value,
        inputC.value,
        inputD.value,
        partsX.value,
        partsY.value
    );
};