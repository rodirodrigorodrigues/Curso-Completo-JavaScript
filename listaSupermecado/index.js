var itens = [];

document.querySelector('button[type=submit]')
  .addEventListener('click', () => {
    const nomeProduto = document.getElementById('nome_produto');
    const valorProduto = document.getElementById('valor_produto');
    itens.push({
      nomeProduto: nomeProduto.value,
      valorProduto: valorProduto.value
    });
    let listaProdutos = document.querySelector('.lista-produtos');
    let soma = 0;
    listaProdutos.innerHTML = "";
    itens.forEach(item => {
      soma += parseFloat(item.valorProduto);
      listaProdutos.innerHTML += `
        <div class="lista-produto-single">
          <h3>${item.nomeProduto} - </h3>
          <h3>R$ ${item.valorProduto}</h3>
        </div>
      `;
    });
    soma = soma.toFixed(2);
    nomeProduto.value = "";
    valorProduto.value = "";
    const listaProdutosTotal = document.querySelector('.lista-produtos-total');
    listaProdutosTotal.innerHTML = `
      <h1>R$ Total: ${soma}</h1>
    `
  })