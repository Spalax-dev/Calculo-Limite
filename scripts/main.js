document.addEventListener("DOMContentLoaded", () => {
    const half = (a, b) => (a + b) / 2;

    function findTend(fn, t, maxAttempts = 300) {
        return ft1(fn, t, t - 1, t + 1, maxAttempts);
    }

    function ft1(fn, t, l, r, maxAtm = 300, atm = 1) {
        const lRes = fn(l);
        const rRes = fn(r);
        const diff = Math.abs(lRes - rRes);

        if (maxAtm <= atm) {
            return { attempts: atm, lastDiff: diff, result: undefined };
        }

        if (diff > 0.01) {
            return ft1(fn, t, half(l, t), half(r, t), maxAtm, atm + 1);
        }

        return {
            attempts: atm,
            lastDiff: diff,
            result: parseFloat(lRes.toFixed(2)),
        };
    }

    const tInput = document.querySelector("#t");
    
    tInput.addEventListener("input", () => {
      const fnX = (t) => t ** 2;
      const fnY = (t) => t ** (1 / 2);
      let aproximation = parseFloat(tInput.value)
      
      const result = document.querySelector("#result")
      x = findTend(fnX, aproximation)
      y = findTend(fnY, aproximation)
      
      if (isNaN(x.result)) {
        x.result = "No existe";
      }

      if (isNaN(y.result)) {
        y.result = "No existe";
      }

      result.innerHTML =`El limite en X es: <span class="lim">${x.result}</span> <br>El limite en Y es: <span class="lim">${y.result}</span>`
    })
    

    // console.log('limite en x: ' + findTend(fnX, aproximation));
    // console.log('limite en y: ' + findTend(fnY, aproximation));
    // console.log(findTend(fnX, aproximation, 30));
    // console.log(findTend(fnY, aproximation, 30));
});
