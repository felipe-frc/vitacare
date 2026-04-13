(function () {
  function ensureToastContainer() {
    let container = document.querySelector('.app-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'app-toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  window.appNavigate = function (url) {
    window.location.href = url;
  };

  window.appGoBack = function () {
    window.history.back();
  };

  window.appToast = function (type, title, message) {
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.className = `app-toast app-toast--${type || 'success'}`;
    toast.innerHTML = `
      <div class="app-toast__title">${title || 'Aviso'}</div>
      <div class="app-toast__message">${message || ''}</div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
      if (!container.children.length) container.remove();
    }, 3500);
  };

  document.addEventListener('click', function (event) {
    const navTarget = event.target.closest('[data-nav]');
    if (navTarget) {
      event.preventDefault();
      window.appNavigate(navTarget.dataset.nav);
      return;
    }

    const backTarget = event.target.closest('[data-back]');
    if (backTarget) {
      event.preventDefault();
      window.appGoBack();
      return;
    }

    const toastTarget = event.target.closest('[data-toast-title]');
    if (toastTarget) {
      event.preventDefault();
      window.appToast(
        toastTarget.dataset.toastType || 'success',
        toastTarget.dataset.toastTitle,
        toastTarget.dataset.toastMessage || ''
      );
    }
  });
})();
