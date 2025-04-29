const form = document.getElementById("formGasto");
const lista = document.getElementById("listaGastos");
const totalSpan = document.getElementById("total");
const erroMsg = document.getElementById("erro");

const inputDescricao = document.getElementById("descricao");
const inputCategoria = document.getElementById("categoria");
const inputValor = document.getElementById("valor");

let gastos = [];
let editIndex = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const descricao = inputDescricao.value.trim();
  const categoria = inputCategoria.value.trim();
  const valor = parseFloat(inputValor.value.trim());

  if (!descricao || !categoria || isNaN(valor)) {
    erroMsg.textContent = "Preencha todos os campos corretamente!";
    erroMsg.style.display = "block";
    return;
  }

  erroMsg.style.display = "none";

  const novoGasto = { descricao, categoria, valor };

  if (editIndex !== null) {
    gastos[editIndex] = novoGasto;
    editIndex = null;
  } else {
    gastos.push(novoGasto);
  }

  form.reset();
  renderizarLista();
});

function renderizarLista() {
  lista.innerHTML = "";
  let total = 0;

  gastos.forEach((item, index) => {
    total += item.valor;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.descricao} (${item.categoria}) - 
        <span class="${item.valor > 100 ? 'valor-alto' : ''}">R$ ${item.valor.toFixed(2)}</span>
      </span>
      <span>
        <button onclick="editarGasto(${index})">Editar</button>
        <button onclick="removerGasto(${index})">Excluir</button>
      </span>
    `;

    lista.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
}

function editarGasto(index) {
  const item = gastos[index];
  inputDescricao.value = item.descricao;
  inputCategoria.value = item.categoria;
  inputValor.value = item.valor;
  editIndex = index;
}

function removerGasto(index) {
  gastos.splice(index, 1);
  renderizarLista();
}
