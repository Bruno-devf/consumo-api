document.addEventListener('DOMContentLoaded', function () {
    carregarDados('http://localhost:3031/mostrarEvent', 'eventosList');
    carregarDados('http://localhost:3031/mostrarRelatorio', 'relatoriosList');
    
    // Exibir o nome do usuário logado na navbar
    const nomeUsuario = localStorage.getItem('usuarioNome');
    if (nomeUsuario) {
        document.querySelector('.navbar-text').textContent = `Bem-vindo, ${nomeUsuario}`;
    } else {
        window.location.href = 'login.html'; // Redireciona se não estiver logado
    }
  
    // Evento de Logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('usuarioNome'); // Remove o nome do usuário do localStorage
        window.location.href = 'login.html'; // Redireciona para a página de login
    });
  });
  
  // Função para carregar dados (Eventos ou Relatórios)
  function carregarDados(url, listId) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const listElement = document.getElementById(listId);
        data.forEach(item => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item');
          
          if (listId === 'eventosList') {
            // Exibe dados do evento
            listItem.textContent = `${item.nome} - ${new Date(item.data).toLocaleDateString()}`;
          } else if (listId === 'relatoriosList') {
            // Exibe dados do relatório
            listItem.innerHTML = `
              <strong>Tipo:</strong> ${item.tipo} <br>
              <strong>Descrição:</strong> ${item.descricao}
            `;
          }
          
          listElement.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar dados:', error);
      });
  }
  