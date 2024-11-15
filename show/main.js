document.addEventListener('DOMContentLoaded', function() {
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

    // Função para exibir os itens na tela
    const exibirDados = (element, dados, tipo) => {
        dados.forEach(item => {
            const cardItem = document.createElement('li');
            cardItem.classList.add('mb-3', 'border-bottom');
            
            let itemContent = `<strong>${tipo === 'evento' ? item.nome : tipo === 'relatorio' ? item.descricao : item.nome}</strong><br>
                               ${tipo === 'evento' ? `ID: ${item.id} | Data: ${formatarData(item.data)} | Local: ${item.local}` : 
                                tipo === 'relatorio' ? `ID: ${item.id} | Tipo: ${item.tipo}` : `E-mail: ${item.email}`}<br>`;

            if (tipo !== 'professor') {
                itemContent += ` 
                    <a href="../upd/edit.html?id=${item.id}" class="btn btn-warning btn-sm mt-2">Editar</a>
                    <a href="../delete/delete.html?id=${item.id}" class="btn btn-danger btn-sm mt-2 ms-2">Excluir</a>
                `;
            }

            cardItem.innerHTML = itemContent;
            element.appendChild(cardItem);
        });
    };

    // Carregar Eventos
    const carregarEventos = async () => {
        try {
            const response = await fetch('http://localhost:3031/mostrarEvent');
            const eventos = await response.json();
            exibirDados(eventosList, eventos, 'evento');
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
        }
    };

    // Carregar Relatórios
    const carregarRelatorios = async () => {
        try {
            const response = await fetch('http://localhost:3031/mostrarRelatorio');
            const relatorios = await response.json();
            exibirDados(relatoriosList, relatorios, 'relatorio');
        } catch (error) {
            console.error('Erro ao carregar relatórios:', error);
        }
    };

    // Carregar Professores
    const carregarProfessores = async () => {
        try {
            const response = await fetch('http://localhost:3031/mostrarProf');
            const professores = await response.json();
            exibirDados(professoresList, professores, 'professor');
        } catch (error) {
            console.error('Erro ao carregar professores:', error);
        }
    };

    // Carregar os dados ao iniciar
    carregarEventos();
    carregarRelatorios();
    carregarProfessores();
});
