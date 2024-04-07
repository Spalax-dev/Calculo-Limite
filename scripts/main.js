document.addEventListener("DOMContentLoaded", () => {
    /**
     * halla el limite de una funcion
     * 
     * @param {Function} fn funcion
     * @param {Number} t valor del parametro de tendencia
     * @param {Number} maxAttempts numero maximo de intentos permitidos
     * 
     * @returns un objeto con el numero de intentos realizados,
     * la ultima diferencia registrada entre la evaluacion izquierda y derecha,
     * y el resultado del limite, en caso de no encontrarlo se asigna "undefined"
     */
    function findTend(fn, t, maxAttempts = 300) {
        return ft1(fn, t, t - 1, t + 1, maxAttempts);
    }

    /**
     * cacula el valor del limite por evaluacion
     * 
     * @param {Function} fn funcion
     * @param {Number} t numero de tendencia
     * @param {Number} left numero de evaluacion por izquierda
     * @param {Number} right numero de evaluacion por derecha 
     * @param {Number} maxAtm numero maximo de intentos permitidos
     * @param {Number} atm intento actual (actua como contador para los intentos)
     * 
     * @returns un objeto con el numero de intentos realizados,
     * la ultima diferencia registrada entre la evaluacion izquierda y derecha,
     * y el resultado del limite, en caso de no encontrarlo se asigna "undefined"
     */
    function ft1(fn, t, left, right, maxAtm = 300, atm = 1) {
        // Reducir los numeros ingresados
        const half = (a, b) => (a + b) / 2;
        // evaluar la funcion por la izquierda y derecha
        const lRes = fn(left);
        const rRes = fn(right);
        // calcular la diferencia entre las funciones evaluadas
        const diff = Math.abs(lRes - rRes);

        if (maxAtm <= atm) { // si se alcanza la cantidad maxima de intentos, retornar indefinido
            return { attempts: atm, lastDiff: diff, result: undefined };
        }

        if (diff > 0.01) { // si la diferencia es mayor a 0.01, volver a ejecutar
            return ft1(fn, t, half(left, t), half(right, t), maxAtm, atm + 1);
        }

        // si la diferencia es menor a 0.01 devolver la informacion del limite
        return {
            attempts: atm, // numero de itentos realizados
            lastDiff: diff, // ultima diferencia registrada
            result: parseFloat(lRes.toFixed(3)), // valor del limite
        };
    }

    /*
    | -------------------------------------------------------------
    | Seccion para la presentacion de la informacion
    | -------------------------------------------------------------
    | desde aqui en adelante es codigo que controla
    | la presentacion de la informacion en la apliacion
    | por lo que no cuenta con ninguna logica matematica
    | sobre el calulo de los limites.
    */

    const tInput = document.querySelector("#t");
  
    tInput.addEventListener("input", () => {
      // Se declaran las funciones de cada componente del vector
      const fnX = (t) => t ** 2; 
      const fnY = (t) => t ** (1 / 2);
      // Obtener la variable 't' ingresada por el usuario
      let aproximation = parseFloat(tInput.value)
      
      const result = document.querySelector("#result")
      // Obtener la tendencia de cada componente
      x = findTend(fnX, aproximation)
      y = findTend(fnY, aproximation)

      if (isNaN(x.result) || isNaN(y.result)) { // si el resultado no existe
        result.innerHTML =`El limite <span class="lim">no existe</span>` 
      } else {
        result.innerHTML =`El limite es:  
          < <span class="lim">${x.result}</span>
          , 
          <span class="lim">${y.result}</span> >`
      }
    })
});
