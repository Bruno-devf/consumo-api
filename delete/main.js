document.addEventListener('DOMContentLoaded', function() {
    const formDeleteEvento = document.getElementById('formDeleteEvento');
    const formDeleteRelatorio = document.getElementById('formDeleteRelatorio');
    const msgEvento = document.getElementById('msgEvento');
    const msgRelatorio = document.getElementById('msgRelatorio');
    const msgProfessor = document.getElementById('msgProfessor'); // Mensagem de sucesso para deletar professor
    
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
        msgEvento.innerHTML = ''; // Limpa a mensagem anterior

        try {
            const response = await fetch(`http://localhost:3031/deletarEvent/${id}`);
            const result = await response.json();

            if (response.ok) {
                msgEvento.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
            } else {
                msgEvento.appendChild(exibirMensagem(result.mensagem || 'Erro ao deletar evento', 'erro'));
            }
        } catch (error) {
            msgEvento.appendChild(exibirMensagem('Erro ao conectar ao servidor', 'erro'));
        }
    });

    // Deletar Relatório
    formDeleteRelatorio.addEventListener('submit', async function(event) {
        event.preventDefault();
        const id = document.getElementById('idRelatorio').value;
        msgRelatorio.innerHTML = ''; // Limpa a mensagem anterior

        try {
            const response = await fetch(`http://localhost:3031/deletarRela/${id}`);
            const result = await response.json();

            if (response.ok) {
                msgRelatorio.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
            } else {
                msgRelatorio.appendChild(exibirMensagem(result.mensagem || 'Erro ao deletar relatório', 'erro'));
            }
        } catch (error) {
            msgRelatorio.appendChild(exibirMensagem('Erro ao conectar ao servidor', 'erro'));
        }
    });

    // Deletar Professor (Agora a mensagem será exibida diretamente no HTML)
    const idProfessor = 123;  // Exemplo de ID de professor (substitua por lógica real)

    try {
        const response = await fetch(`http://localhost:3031/deletarProf/${idProfessor}`);
        const result = await response.json();

        // Exibe mensagem de sucesso ou erro diretamente no HTML
        if (response.ok) {
            msgProfessor.textContent = result.mensagem || 'Professor deletado com sucesso!';
            msgProfessor.style.color = 'green'; // Mensagem verde para sucesso
        } else {
            msgProfessor.textContent = result.mensagem || 'Erro ao deletar professor';
            msgProfessor.style.color = 'red'; // Mensagem vermelha para erro
        }
    } catch (error) {
        msgProfessor.textContent = 'Erro ao conectar ao servidor';
        msgProfessor.style.color = 'red';
    }
});