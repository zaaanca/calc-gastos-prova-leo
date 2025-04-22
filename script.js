let lista = [];
let contadorlista = 0;

function adicionarAlista(descricao, categoria, valor) {
    lista.push({ descricao, categoria, valor });
    contadorlista++;
    atualizarlista();
    localStorage.setItem('lista', JSON.stringify(lista));
}

function removerDolista(index) {
    lista.splice(index, 1);
    contadorlista--;
    atualizarlista();
    localStorage.setItem('lista', JSON.stringify(lista));
}

function atualizarlista() {
    const contador = document.getElementById('lista-contador');
    contador.textContent = contadorlista;

    const lista = document.getElementById('lista');
    const total = document.getElementById('lista-total');
    listaLista.innerHTML = '';
    let totalValor = 0;

    lista.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerDolista(index);
        li.appendChild(botaoRemover);
        listaLista.appendChild(li);
        totalValor += item.preco;
    });

    total.textContent = `Total: R$ ${totalValor.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const listaSalvo = JSON.parse(localStorage.getItem('lista')) || [];
    lista = listaSalvo;
    contadorlista = lista.length;
    atualizarlista();
});