document.addEventListener('DOMContentLoaded', function() {
    // Elementos de listas no HTML
    const eventosList = document.getElementById('eventosList');
    const relatoriosList = document.getElementById('relatoriosList');
    const professoresList = document.getElementById('professoresList');

    // Função para formatar a data no formato dd/mm/yyyy
    const formatarData = (dataHora) => {
        const data = new Date(dataHora);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam do 0, então somamos 1
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    // Função para exibir os dados na tela (Eventos, Relatórios, Professores)
    const exibirDados = (element, dados, tipo) => {
        // Limpa o conteúdo da lista antes de adicionar novos itens
        element.innerHTML = '';
        
        dados.forEach(item => {
            const cardItem = document.createElement('li');
            cardItem.classList.add('mb-3', 'border-bottom');
            
            // Conteúdo específico para cada tipo de item
            let itemContent = '';
            if (tipo === 'evento') {
                itemContent = `<strong>${item.nome}</strong><br>
                               ID: ${item.id} | Data: ${formatarData(item.data)} | Local: ${item.local}<br>
                               <a href="../upd/editevent.html?id=${item.id}" class="btn btn-warning btn-sm mt-2">Editar</a>
                               <a href="../delete/deleteeve.html?id=${item.id}" class="btn btn-danger btn-sm mt-2 ms-2">Excluir</a>`;
            } else if (tipo === 'relatorio') {
                itemContent = `<strong>${item.descricao}</strong><br>
                               ID: ${item.id} | Tipo: ${item.tipo}<br>
                               <a href="../upd/editrela.html?id=${item.id}" class="btn btn-warning btn-sm mt-2">Editar</a>
                               <a href="../delete/deleterela.html?id=${item.id}" class="btn btn-danger btn-sm mt-2 ms-2">Excluir</a>`;
            } else if (tipo === 'professor') {
                itemContent = `<strong>${item.nome}</strong><br>
                               E-mail: ${item.email}<br>`;
            }

            cardItem.innerHTML = itemContent;
            element.appendChild(cardItem);
        });
    };

    // Função para carregar dados de qualquer tipo
    const carregarDados = async (url, tipo, element) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${tipo}`);
            }
            const dados = await response.json();
            if (dados.length === 0) {
                element.innerHTML = `<li class="text-muted">Nenhum ${tipo} encontrado.</li>`;
            } else {
                exibirDados(element, dados, tipo);
            }
        } catch (error) {
            console.error(`Erro ao carregar ${tipo}:`, error);
            element.innerHTML = `<li class="text-danger">Erro ao carregar ${tipo}.</li>`;
        }
    };

    // Carregar os dados de Eventos, Relatórios e Professores ao iniciar
    carregarDados('http://localhost:3031/mostrarEvent', 'evento', eventosList); // Para eventos
    carregarDados('http://localhost:3031/mostrarRelatorio', 'relatorio', relatoriosList); // Para relatórios
    carregarDados('http://localhost:3031/mostrarProf', 'professor', professoresList); // Para professores
});
