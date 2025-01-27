document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const clearFieldsBtn = document.getElementById('clear-fields');
    const deleteAllBtn = document.getElementById('delete-all');
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');

    // Carregar usuários do Local Storage
    const loadUsers = () => {
        userList.innerHTML = '';
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => addUserToList(user));
    };

    // Adicionar usuário à lista
    const addUserToList = (user) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${user.date}</span><br>
            <span>${user.name}</span><br>
            <span>${user.email}</span>
            <button class="delete-user">Excluir</button>
        `;
        userList.appendChild(li);

        // Adicionar evento de exclusão
        li.querySelector('.delete-user').addEventListener('click', () => {
            deleteUser(user);
        });
    };

    // Salvar usuário no Local Storage
    const saveUser = (user) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    };

    // Excluir usuário do Local Storage
    const deleteUser = (userToDelete) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(user => user.email !== userToDelete.email);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    };

    // Excluir todos os usuários do Local Storage
    const deleteAllUsers = () => {
        localStorage.removeItem('users');
        loadUsers();
    };

    // Pesquisar usuários
    const searchUsers = (query) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(query.toLowerCase()) || 
            user.email.toLowerCase().includes(query.toLowerCase())
        );
        userList.innerHTML = '';
        filteredUsers.forEach(user => addUserToList(user));
    };

    // Evento de envio do formulário
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = {
            date: new Date().toLocaleDateString(),
            name: userForm.user.value,
            email: userForm.email.value
        };
        saveUser(user);
        addUserToList(user);
        userForm.reset();
    });

    // Evento de limpar campos
    clearFieldsBtn.addEventListener('click', () => {
        userForm.reset();
    });

    // Evento de excluir todos os usuários
    deleteAllBtn.addEventListener('click', deleteAllUsers);

    // Evento de pesquisa
    searchBtn.addEventListener('click', () => {
        searchUsers(searchInput.value);
    });

    // Carregar usuários ao iniciar
    loadUsers();
});