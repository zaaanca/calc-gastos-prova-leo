document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('#cgastos form');
    const listaGastos = document.createElement('ul');
    document.querySelector('#cgastos').appendChild(listaGastos);

    const totalGastosDiv = document.createElement('div');
    totalGastosDiv.id = 'total-gastos';
    totalGastosDiv.textContent = 'Total: R$ 0.00';
    document.querySelector('#cgastos').appendChild(totalGastosDiv);

    let itemParaEdicao = null;

    function atualizarTotalGastos() {
        let total = 0;
        const valoresGastos = listaGastos.querySelectorAll('.valor-gasto');
        valoresGastos.forEach(valorElement => {
            total += parseFloat(valorElement.textContent);
        });
        totalGastosDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    function adicionarGasto(descricao, categoria, valor) {
        const novoItemLista = document.createElement('li');
        novoItemLista.innerHTML = `
            <span>Descrição: ${descricao}, Categoria: ${categoria}, Valor: R$ <span class="valor-gasto">${valor.toFixed(2)}</span></span>
            <div class="acoes">
                <button class="editar">Editar</button>
                <button class="excluir">Excluir</button>
            </div>
        `;

        if (valor > 100) {
            novoItemLista.querySelector('.valor-gasto').classList.add('alto-valor');
        }

        listaGastos.appendChild(novoItemLista);
        atualizarTotalGastos();

        const botaoExcluir = novoItemLista.querySelector('.excluir');
        botaoExcluir.addEventListener('click', function() {
            listaGastos.removeChild(this.parentNode.parentNode);
            atualizarTotalGastos();
        });

        const botaoEditar = novoItemLista.querySelector('.editar');
        botaoEditar.addEventListener('click', function() {
            document.getElementById('descricao').value = descricao;
            document.getElementById('categoria').value = categoria;
            document.getElementById('valor').value = valor;

            itemParaEdicao = novoItemLista;
            const botaoCadastrar = formulario.querySelector('button[type="submit"]');
            botaoCadastrar.textContent = 'Salvar Edição';
        });
    }

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const categoria = document.getElementById('categoria').value;
        const valor = parseFloat(document.getElementById('valor').value);

        if (descricao && categoria && !isNaN(valor)) {
            if (itemParaEdicao) {
                itemParaEdicao.innerHTML = `
                    <span>Descrição: ${descricao}, Categoria: ${categoria}, Valor: R$ <span class="valor-gasto">${valor.toFixed(2)}</span></span>
                    <div class="acoes">
                        <button class="editar">Editar</button>
                        <button class="excluir">Excluir</button>
                    </div>
                `;
                if (valor > 100) {
                    itemParaEdicao.querySelector('.valor-gasto').classList.add('alto-valor');
                } else {
                    itemParaEdicao.querySelector('.valor-gasto').classList.remove('alto-valor');
                }

                const novoBotaoExcluir = itemParaEdicao.querySelector('.excluir');
                novoBotaoExcluir.addEventListener('click', function() {
                    listaGastos.removeChild(this.parentNode.parentNode);
                    atualizarTotalGastos();
                });

                const novoBotaoEditar = itemParaEdicao.querySelector('.editar');
                novoBotaoEditar.addEventListener('click', function() {
                    document.getElementById('descricao').value = descricao;
                    document.getElementById('categoria').value = categoria;
                    document.getElementById('valor').value = valor;
                    itemParaEdicao = itemParaEdicao;
                    const botaoCadastrar = formulario.querySelector('button[type="submit"]');
                    botaoCadastrar.textContent = 'Salvar Edição';
                });

                formulario.querySelector('button[type="submit"]').textContent = 'Cadastrar';
                itemParaEdicao = null;
            } else {
                adicionarGasto(descricao, categoria, valor);
            }
            formulario.reset();
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
});