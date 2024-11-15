document.addEventListener('DOMContentLoaded', function() {
    const formDeleteEvento = document.getElementById('formDeleteEvento');
    const formDeleteRelatorio = document.getElementById('formDeleteRelatorio');
    const msgEvento = document.getElementById('msgEvento');
    const msgRelatorio = document.getElementById('msgRelatorio');
    const msgSucesso = document.getElementById('msgSucesso'); // Mensagem de sucesso geral
    
    // Função para exibir mensagens de sucesso
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
                // Exibe a mensagem de sucesso apenas
                msgEvento.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
                msgSucesso.textContent = 'Evento deletado com sucesso!'; // Exibe a mensagem de sucesso
                msgSucesso.style.color = 'green'; // Verde para sucesso
            }
        } catch (error) {
            // Não exibe nenhuma mensagem de erro
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
                // Exibe a mensagem de sucesso apenas
                msgRelatorio.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
                msgSucesso.textContent = 'Relatório deletado com sucesso!'; // Exibe a mensagem de sucesso
                msgSucesso.style.color = 'green'; // Verde para sucesso
            }
        } catch (error) {
            // Não exibe nenhuma mensagem de erro
        }
    });
});
