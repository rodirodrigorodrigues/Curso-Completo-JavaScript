// Retorna todas as tags <p>
const clubes = document.getElementsByTagName('p');
for (let i = 0; i < clubes.length; i++) {
    clubes[i].innerHTML += ' - Time do Rio';
}