document.addEventListener('DOMContentLoaded', function () {
    const msgEvento = document.getElementById('msgEvento');
    const btnConfirmarDeleteEvento = document.getElementById('btnConfirmarDeleteEvento');
    
    // Recupera o ID do evento da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idEvento = urlParams.get('id');  // Agora estamos pegando o parâmetro 'id'

    // Função para exibir mensagens
    const exibirMensagem = (msg, tipo) => {
        const msgElement = document.createElement('div');
        msgElement.classList.add('alert');
        msgElement.classList.add(tipo === 'sucesso' ? 'alert-success' : 'alert-danger');
        msgElement.textContent = msg;
        return msgElement;
    };

    // Verifica se o ID do evento está presente na URL
    if (!idEvento) {
        msgEvento.appendChild(exibirMensagem("ID do evento não encontrado! Verifique a URL.", 'erro'));
        console.log("ID do evento não encontrado:", idEvento); // Exibe o ID no console para depuração
        return;
    }

    // Deletar Evento
    btnConfirmarDeleteEvento.addEventListener('click', async function () {
        try {
            // Realiza a requisição DELETE para excluir o evento
            const response = await fetch(`http://localhost:3031/deletarEvent/${idEvento}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();

            if (response.ok) {
                msgEvento.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
                setTimeout(() => {
                    window.location.href = '../exibir/exibir.html';  // Redireciona após sucesso
                }, 2000); // 2 segundos para ver a mensagem
            } else {
                msgEvento.appendChild(exibirMensagem(result.mensagem || 'Erro ao deletar evento', 'erro'));
            }
        } catch (error) {
            msgEvento.appendChild(exibirMensagem('Erro ao deletar evento', 'erro'));
        }
    });
});
