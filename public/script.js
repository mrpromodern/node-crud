document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
  
    // Загрузка списка пользователей
    async function fetchUsers() {
      const response = await fetch('/api/users');
      const users = await response.json();
      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        userList.appendChild(li);
      });
    }
  
    // Отправка формы
    userForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
  
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
  
      if (response.ok) {
        userForm.reset();
        fetchUsers();
      } else {
        alert('Error adding user');
      }
    });
  
    // Загрузка пользователей при загрузке страницы
    fetchUsers();
  });
  