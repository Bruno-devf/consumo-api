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
  
    fetch('http://localhost:3031/relatorio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao, tipo })
    })
    .then(response => response.json())
    .then(data => {
      // Exibir a mensagem de sucesso na página
      exibirMensagem('sucesso', 'Relatório cadastrado com sucesso!', 'Relatorio');
  
      // Limpar o formulário após o sucesso
      document.getElementById('formRelatorio').reset();
    })
    .catch(error => {
      // Exibir a mensagem de erro na página
      exibirMensagem('erro', 'Erro ao cadastrar relatório: ' + error, 'Relatorio');
    });
  });
  