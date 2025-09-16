// Imagina que seu HTML é uma cidade, e cada tag (tipo <div>, <p>, <span>) é uma casa.
// O querySelectorAll() é um detetive que você manda procurar todas as casas que batem com a descrição que você der — tipo "todas as casas com a porta vermelha".

const presos = document.querySelectorAll('.preso.reincidente');
console.log(presos);
for (let i = 0; i < presos.length; i++) {
    presos[i].style.backgroundColor = 'red';
}