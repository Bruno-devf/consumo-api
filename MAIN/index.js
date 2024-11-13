        // Função para carregar dados de eventos e relatórios
        document.addEventListener('DOMContentLoaded', function () {
            carregarDados('http://localhost:3031/mostrarEvent', 'eventosList');
            carregarDados('http://localhost:3031/mostrarRelatorio', 'relatoriosList');
            
            // Exibir o nome do usuário logado na navbar
            const nomeUsuario = localStorage.getItem('usuarioNome');
            if (nomeUsuario) {
                document.querySelector('.navbar-text').textContent = `Bem-vindo, ${nomeUsuario}`;
            } else {
                window.location.href = 'index.html'; // Redireciona se não estiver logado
            }

            // Evento de Logout
            document.getElementById('logoutBtn').addEventListener('click', function() {
                localStorage.removeItem('usuarioNome'); // Remove o nome do usuário do localStorage
                window.location.href = 'login.html'; // Redireciona para a página de login
            });
        });

        function carregarDados(url, listId) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const listElement = document.getElementById(listId);
                    data.forEach(item => {
                        const listItem = document.createElement('li');
                        listItem.classList.add('list-group-item');
                        listItem.textContent = item.nome || item.descricao;
                        listElement.appendChild(listItem);
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar dados:', error);
                });
        }