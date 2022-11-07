function logout() {
  const logout = document.querySelector('#logout');
  if (!logout) {
    throw new Error('No logout button selector');
  }
  if (logout) {
    logout.addEventListener('click', () => {
      localStorage.removeItem('expenseUser');
      window.location = 'login.html';
    })
  }
}

function renderLogo() {
  // console.log(logo);
}

export {
  logout,
  renderLogo
}
