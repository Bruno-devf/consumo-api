// Recupera o ID do evento da URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');  // ID do evento que será editado

// Função para exibir mensagens na interface
function exibirMensagem(tipo, mensagem) {
    const msgEvento = document.getElementById('msgEvento');
    msgEvento.innerHTML = `<div class="alert alert-${tipo}">${mensagem}</div>`;
}

// Função para carregar o evento do backend
async function carregarEvento(id) {
    try {
      const response = await fetch(`http://localhost:3031/evento/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao carregar o evento.');
      }
      
      const evento = await response.json();
  
      // Preenche os campos do formulário com os dados do evento
      document.getElementById('nomeEvento').value = evento.nome || '';
      document.getElementById('dataEvento').value = evento.data.split('T')[0] || '';  // Formato para input type="date"
      document.getElementById('descricaoEvento').value = evento.descricao || '';
      document.getElementById('localEvento').value = evento.local || '';
      document.getElementById('horarioEvento').value = evento.horario || '';
      
      // Se o evento tiver um responsável, preencher o campo do professor (responsavelId)
      if (evento.responsavel && evento.responsavel.id) {
        document.getElementById('responsavelEvento').value = evento.responsavel.id;  // Supondo que você tenha um campo de ID do professor no formulário
      }
  
    } catch (error) {
      console.error('Erro ao carregar evento:', error);
      exibirMensagem('danger', 'Erro ao carregar os dados do evento.');
    }
  }
  
  // Carrega o evento assim que a página for carregada
  if (id) {
    carregarEvento(id);
  }

// Função para atualizar o evento
document.getElementById('formEditEvento').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio tradicional do formulário

    // Captura os valores dos campos do formulário
    const nome = document.getElementById('nomeEvento').value;
    const data = document.getElementById('dataEvento').value;
    const descricao = document.getElementById('descricaoEvento').value;
    const local = document.getElementById('localEvento').value;
    const horario = document.getElementById('horarioEvento').value;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !data || !descricao || !local || !horario) {
        exibirMensagem('danger', 'Todos os campos devem ser preenchidos.');
        return;
    }

    try {
        // Envia a solicitação para atualizar o evento
        const response = await fetch(`http://localhost:3031/editarEvent/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome,
                data,
                descricao,
                local,
                horario
            })
        });

        const dataResponse = await response.json();
        if (response.ok) {
            exibirMensagem('success', 'Evento atualizado com sucesso!');
        } else {
            exibirMensagem('danger', dataResponse.mensagem || 'Erro ao atualizar evento.');
        }
    } catch (error) {
        console.error('Erro ao atualizar evento:', error);
        exibirMensagem('danger', 'Erro ao atualizar evento.');
    }
});
