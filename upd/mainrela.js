// Recupera o ID do relatório da URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');  // ID do relatório que será editado

// Função para exibir mensagens na interface
function exibirMensagem(tipo, mensagem) {
    const msgRelatorio = document.getElementById('msgRelatorio');
    msgRelatorio.innerHTML = `<div class="alert alert-${tipo}">${mensagem}</div>`;
}

// Função para carregar o relatório do backend
async function carregarRelatorio(id) {
    try {
      const response = await fetch(`http://localhost:3031/relatorio/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao carregar o relatório.');
      }
      
      const relatorio = await response.json();
  
      // Preenche os campos do formulário com os dados do relatório
      document.getElementById('descricaoRelatorio').value = relatorio.descricao || '';
      document.getElementById('tipoRelatorio').value = relatorio.tipo || '';
      
    } catch (error) {
      console.error('Erro ao carregar relatório:', error);
      exibirMensagem('danger', 'Erro ao carregar os dados do relatório.');
    }
}
  
// Carrega o relatório assim que a página for carregada
if (id) {
    carregarRelatorio(id);
}

// Função para atualizar o relatório
document.getElementById('formEditRelatorio').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio tradicional do formulário

    // Captura os valores dos campos do formulário
    const descricao = document.getElementById('descricaoRelatorio').value;
    const tipo = document.getElementById('tipoRelatorio').value;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!descricao || !tipo) {
        exibirMensagem('danger', 'Todos os campos devem ser preenchidos.');
        return;
    }

    try {
        // Envia a solicitação para atualizar o relatório
        const response = await fetch(`http://localhost:3031/editarRela/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                descricao,
                tipo
            })
        });

        const dataResponse = await response.json();
        if (response.ok) {
            exibirMensagem('success', 'Relatório atualizado com sucesso!');
        } else {
            exibirMensagem('danger', dataResponse.mensagem || 'Erro ao atualizar relatório.');
        }
    } catch (error) {
        console.error('Erro ao atualizar relatório:', error);
        exibirMensagem('danger', 'Erro ao atualizar relatório.');
    }
});
