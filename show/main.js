document.addEventListener('DOMContentLoaded', function() {
    const eventosList = document.getElementById('eventosList');
    const relatoriosList = document.getElementById('relatoriosList');
    const professoresList = document.getElementById('professoresList');

    // Função para exibir os itens na tela
    const exibirDados = (element, dados, tipo) => {
        dados.forEach(item => {
            const cardItem = document.createElement('li');
            cardItem.innerHTML = `
                <strong>${tipo === 'evento' ? item.nome : tipo === 'relatorio' ? item.descricao : item.nome}</strong><br>
                ${tipo === 'evento' ? `Data: ${item.data} | Local: ${item.local}` : tipo === 'relatorio' ? `Tipo: ${item.tipo}` : `E-mail: ${item.email}`}
                <br><a href="../upd/index.html?id=${item.id}" class="btn btn-editar btn-sm mt-2">Editar</a>
            `;
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
            const response = await fetch('http://localhost:3031/mostrarRela');
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
