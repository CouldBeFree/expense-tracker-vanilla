class HandleClosedRoutes {
  constructor(currentPage) {
    this.currentPage = currentPage;
    this.openPages = {
      LOGIN: '/login.html',
      REGISTER: '/register.html'
    };
    this.closedPage = {
      HOME: '/',
      CATEGORIES: '/categories.html'
    }
    this.closedPages = ['/', '/categories'];
  }

  get isUserLoggedIn() {
    return !!localStorage.getItem('expenseUser');
  }

  handlePublic() {
    if (!this.isUserLoggedIn && (this.currentPage === this.openPages.LOGIN || this.currentPage === this.openPages.REGISTER)) {
      return true;
    } else {
      window.location = '/index.html';
    }
  }

  handleClosed() {

  }
}

export default HandleClosedRoutes;
