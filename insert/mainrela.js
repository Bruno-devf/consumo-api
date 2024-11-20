// Função para exibir o feedback (sucesso ou erro)
function exibirMensagem(tipo, mensagem, tipoCadastro) {
  const feedbackElement = document.getElementById(`feedback${tipoCadastro}`);
  feedbackElement.style.display = 'block';

  // Limpar qualquer classe anterior
  feedbackElement.classList.remove('alert-success', 'alert-danger');

  // Adicionar a classe adequada
  if (tipo === 'sucesso') {
    feedbackElement.classList.add('alert-success');
  } else if (tipo === 'erro') {
    feedbackElement.classList.add('alert-danger');
  }

  // Definir a mensagem
  feedbackElement.textContent = mensagem;
}

// Função para cadastrar o relatório
document.getElementById('formRelatorio').addEventListener('submit', function(event) {
  event.preventDefault();

  const descricao = document.getElementById('descricaoRelatorio').value;
  const tipo = document.getElementById('tipoRelatorio').value;

  // Verifica se os valores são válidos
  if (!descricao || !tipo) {
    exibirMensagem('erro', 'Preencha todos os campos corretamente.', 'Relatorio');
    return;
  }

  // Envia os dados do formulário para o backend
  fetch('http://localhost:3031/relatorio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descricao, tipo, eventoId: null, professorId: null }) // Se não estiver utilizando esses campos, remova do corpo
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.mensagem) {
      exibirMensagem('sucesso', data.mensagem, 'Relatorio');
      document.getElementById('formRelatorio').reset();
    } else {
      exibirMensagem('erro', data.erro, 'Relatorio');
    }
  })
  .catch(error => {
    exibirMensagem('erro', 'Erro ao cadastrar relatório: ' + error.message, 'Relatorio');
  });
});
