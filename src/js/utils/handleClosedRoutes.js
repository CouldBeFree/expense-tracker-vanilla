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
  }

  get isUserLoggedIn() {
    return !!localStorage.getItem('expense');
  }

  handlePublic() {
    if (!this.isUserLoggedIn && (this.currentPage === this.openPages.LOGIN || this.currentPage === this.openPages.REGISTER)) {
      return true;
    } else {
      window.location = '/index.html';
    }
  }

  handleClosed() {
    if (!this.isUserLoggedIn && (this.currentPage === this.closedPage.HOME || this.currentPage === this.closedPage.CATEGORIES)) {
      return true;
    } else {
      window.location = '/';
    }
  }
}

export default HandleClosedRoutes;
