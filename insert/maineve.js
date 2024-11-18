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

// Função para cadastrar o evento
document.getElementById('formEvento').addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nomeEvento').value;
  const data = document.getElementById('dataEvento').value;
  const descricao = document.getElementById('descricaoEvento').value;
  const local = document.getElementById('localEvento').value;
  const horario = document.getElementById('horarioEvento').value;

  fetch('http://localhost:3031/evento', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, data, descricao, local, horario })
  })
  .then(response => response.json())
  .then(data => {
    // Exibir a mensagem de sucesso na página
    exibirMensagem('sucesso', 'Evento cadastrado com sucesso!', 'Evento');

    // Limpar o formulário após o sucesso
    document.getElementById('formEvento').reset();
  })
  .catch(error => {
    // Exibir a mensagem de erro na página
    exibirMensagem('erro', 'Erro ao cadastrar evento: ' + error, 'Evento');
  });
});
