document.addEventListener('DOMContentLoaded', function() {
    const formEditEvento = document.getElementById('formEditEvento');
    const formEditRelatorio = document.getElementById('formEditRelatorio');
    const formEditProfessor = document.getElementById('formEditProfessor');
    
    // Função para exibir mensagens de sucesso ou erro
    const exibirMensagem = (msg, tipo) => {
        const msgElement = document.createElement('div');
        msgElement.classList.add('alert');
        msgElement.classList.add(tipo === 'sucesso' ? 'alert-success' : 'alert-danger');
        msgElement.textContent = msg;
        return msgElement;
    };

    // Editar Evento
    formEditEvento.addEventListener('submit', async function(event) {
        event.preventDefault();
        const id = document.getElementById('idEvento').value;
        const nome = document.getElementById('nomeEvento').value;
        const data = document.getElementById('dataEvento').value;
        const descricao = document.getElementById('descricaoEvento').value;
        const local = document.getElementById('localEvento').value;
        const horario = document.getElementById('horarioEvento').value;
        const msgContainer = document.getElementById('msgEvento');
        msgContainer.innerHTML = '';

        try {
            const response = await fetch(`http://localhost:3031/editarEvent/${id}/${nome}/${data}/${descricao}/${local}/${horario}`);
            const result = await response.json();

            if (response.ok) {
                msgContainer.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
            } else {
                msgContainer.appendChild(exibirMensagem(result.mensagem || 'Erro ao editar evento', 'erro'));
            }
        } catch (error) {
            msgContainer.appendChild(exibirMensagem('Erro ao conectar ao servidor', 'erro'));
        }
    });

    // Editar Relatório
    formEditRelatorio.addEventListener('submit', async function(event) {
        event.preventDefault();
        const id = document.getElementById('idRelatorio').value;
        const descricao = document.getElementById('descricaoRelatorio').value;
        const tipo = document.getElementById('tipoRelatorio').value;
        const msgContainer = document.getElementById('msgRelatorio');
        msgContainer.innerHTML = '';

        try {
            const response = await fetch(`http://localhost:3031/editarRela/${id}/${descricao}/${tipo}`);
            const result = await response.json();

            if (response.ok) {
                msgContainer.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
            } else {
                msgContainer.appendChild(exibirMensagem(result.mensagem || 'Erro ao editar relatório', 'erro'));
            }
        } catch (error) {
            msgContainer.appendChild(exibirMensagem('Erro ao conectar ao servidor', 'erro'));
        }
    });

    // Editar Professor
    formEditProfessor.addEventListener('submit', async function(event) {
        event.preventDefault();
        const id = document.getElementById('idProfessor').value;
        const nome = document.getElementById('nomeProfessor').value;
        const email = document.getElementById('emailProfessor').value;
        const senha = document.getElementById('senhaProfessor').value;
        const msgContainer = document.getElementById('msgProfessor');
        msgContainer.innerHTML = '';

        try {
            const response = await fetch(`http://localhost:3031/editarProf/${id}/${nome}/${email}/${senha}`);
            const result = await response.json();

            if (response.ok) {
                msgContainer.appendChild(exibirMensagem(result.mensagem, 'sucesso'));
            } else {
                msgContainer.appendChild(exibirMensagem(result.mensagem || 'Erro ao editar professor', 'erro'));
            }
        } catch (error) {
            msgContainer.appendChild(exibirMensagem('Erro ao conectar ao servidor', 'erro'));
        }
    });
});
