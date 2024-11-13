var msgcookies = document.getElementById('cookie-msg');

// Função para aceitar cookies
function aceito(){
    localStorage.lgpd = "sim"; // Armazenar a escolha do usuário no localStorage
    msgcookies.classList.remove('mostrar'); // Remover a classe de exibição do aviso
}

// Verificar se o usuário já aceitou os cookies
if(localStorage.lgpd === "sim"){
    msgcookies.classList.remove('mostrar'); // Se aceitou, oculta o aviso
} else {
    msgcookies.classList.add('mostrar'); // Se não aceitou, exibe o aviso
}