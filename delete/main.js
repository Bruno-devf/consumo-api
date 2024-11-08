document.addEventListener('DOMContentLoaded', function() {
    const formDeleteEvento = document.getElementById('formDeleteEvento');
    const formDeleteRelatorio = document.getElementById('formDeleteRelatorio');
    const formDeleteProfessor = document.getElementById('formDeleteProfessor');
    
    // Função para exibir mensagens de sucesso ou erro
    const exibirMensagem = (msg, tipo) => {
        const msgElement = document.createElement('div');
        msgElement.classList.add('alert');
        msgElement.classList.add(tipo === 'sucesso' ? 'alert-success' : 'alert-danger');
        msgElement.textContent = msg;
        return msgElement;
    };

    // Deletar Evento
    formDeleteEvento.addEventListener('submit', async function(event) {
        event.preventDefault();
        const id = document.getElementById('idEvento').value;
        const msgContainer = document.getElementById('msgEvento');
        msgContainer.innerHTML = ''; // Limpa a mensagem anterior

        try {
            const response = await fetch(`http://localhost:3031/deletarEvent/${id}`);
            const result = await response.json();

            if (response.ok) {
                msgContainer.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
            } else {
                msgContainer.appendChild(exibirMensagem(result.mensagem || 'Erro ao deletar evento', 'erro'));
            }
        } catch (error) {
            msgContainer.appendChild(exibirMensagem('Erro ao conectar ao servidor', 'erro'));
        }
    });

    // Deletar Relatório
    formDeleteRelatorio.addEventListener('submit', async function(event) {
        event.preventDefault();
        const id = document.getElementById('idRelatorio').value;
        const msgContainer = document.getElementById('msgRelatorio');
        msgContainer.innerHTML = ''; // Limpa a mensagem anterior

        try {
            const response = await fetch(`http://localhost:3031/deletarRela/${id}`);
            const result = await response.json();

            if (response.ok) {
                msgContainer.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
            } else {
                msgContainer.appendChild(exibirMensagem(result.mensagem || 'Erro ao deletar relatório', 'erro'));
            }
        } catch (error) {
            msgContainer.appendChild(exibirMensagem('Erro ao conectar ao servidor', 'erro'));
        }
    });

    // Deletar Professor
    formDeleteProfessor.addEventListener('submit', async function(event) {
        event.preventDefault();
        const id = document.getElementById('idProfessor').value;
        const msgContainer = document.getElementById('msgProfessor');
        msgContainer.innerHTML = ''; // Limpa a mensagem anterior

        try {
            const response = await fetch(`http://localhost:3031/deletarProf/${id}`);
            const result = await response.json();

            if (response.ok) {
                msgContainer.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
            } else {
                msgContainer.appendChild(exibirMensagem(result.mensagem || 'Erro ao deletar professor', 'erro'));
            }
        } catch (error) {
            msgContainer.appendChild(exibirMensagem('Erro ao conectar ao servidor', 'erro'));
        }
    });
});
