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

// 🔥 Funcionalidades para treinar conceitos JS
// 1. Remover itens da lista (treina eventos e borbulhamento)

// Adicionar um botão de "remover" em cada item.

// Usar event delegation (borbulhamento) na .lista-produtos para capturar cliques de todos os botões sem adicionar evento individualmente.

// document.querySelector('.lista-produtos')
//   .addEventListener('click', (event) => {
//     if (event.target.classList.contains('remover')) {
//       const index = event.target.dataset.index;
//       itens.splice(index, 1);
//       renderizarLista();
//     }
//   });

// 2. Editar um item (treina manipulação do DOM e estado)

// Ao clicar em um item, transformar o texto em um <input> para alterar nome/valor.

// Atualizar o array itens e re-renderizar.

// 3. Ordenar os produtos (treina métodos de array)

// Botões "Ordenar por nome" e "Ordenar por preço".

// Usar .sort() com funções de comparação.

// 4. Filtrar itens (treina eventos + arrays)

// Criar um input de busca que filtra itens pelo nome.

// Exemplo: digitar "arroz" só mostra produtos com "arroz".

// 5. Persistência no navegador (treina JSON + localStorage)

// Salvar itens no localStorage sempre que atualizar.

// Carregar do localStorage ao abrir a página.

// 6. Eventos de teclado (treina keydown/keyup)

// Pressionar Enter no input adiciona automaticamente.

// Prevenir envio padrão do formulário (event.preventDefault()).

// 7. Delegação de eventos para performance (borbulhamento na prática)

// Como falei no remover, adicionar apenas 1 listener na lista, em vez de 1 por item.

// Isso treina bem a diferença entre captura e borbulhamento.

// 8. Usar captura vs borbulhamento (treina fluxo de eventos)

// Colocar listeners na div.lista-produtos, no body e no document.

// Logar a ordem para visualizar o caminho do evento (capturing → target → bubbling).

// 9. Estatísticas extras (treina reduce e array methods)

// Quantidade total de produtos.

// Média de valores.

// Produto mais caro/barato (Math.max / Math.min).

// 10. Animações e transições (treina manipulação de classes)

// Quando adicionar/remover item, aplicar classe CSS animada.

// JS adiciona/remove classes com classList.add/remove/toggle.

// 11. Módulos e organização (treina JS moderno)

// Extrair funções (adicionarItem, removerItem, renderizarLista) em módulos separados.

// Usar import/export para treinar ES Modules.