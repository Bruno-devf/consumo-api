document.addEventListener('DOMContentLoaded', function () {
    const msgRelatorio = document.getElementById('msgRelatorio');
    const btnConfirmarDeleteRelatorio = document.getElementById('btnConfirmarDeleteRelatorio');
    
    // Recupera o ID do relatório da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idRelatorio = urlParams.get('id');  // ID do relatório para deletar

    // Função para exibir mensagens
    const exibirMensagem = (msg, tipo) => {
        const msgElement = document.createElement('div');
        msgElement.classList.add('alert');
        msgElement.classList.add(tipo === 'sucesso' ? 'alert-success' : 'alert-danger');
        msgElement.textContent = msg;
        return msgElement;
    };

    // Verifica se o ID do relatório está presente na URL
    if (!idRelatorio) {
        msgRelatorio.appendChild(exibirMensagem("ID do relatório não encontrado! Verifique a URL.", 'erro'));
        console.log("ID do relatório não encontrado:", idRelatorio); // Exibe o ID no console para depuração
        return;
    }

    // Deletar Relatório
    btnConfirmarDeleteRelatorio.addEventListener('click', async function () {
        try {
            // Realiza a requisição DELETE para excluir o relatório
            const response = await fetch(`http://localhost:3031/deletarRela/${idRelatorio}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();

            if (response.ok) {
                msgRelatorio.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
                setTimeout(() => {
                    window.location.href = '../exibir/exibir.html';  // Redireciona após sucesso
                }, 2000); // 2 segundos para ver a mensagem
            } else {
                msgRelatorio.appendChild(exibirMensagem(result.mensagem || 'Erro ao deletar relatório', 'erro'));
            }
        } catch (error) {
            msgRelatorio.appendChild(exibirMensagem('Erro ao deletar relatório', 'erro'));
        }
    });
});
