(function () {
  function getCurrentFile() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    return (parts[parts.length - 1] || 'index.html').toLowerCase();
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.id = 'vitacare-layout-internal-style';
    style.textContent = `
      :root {
        --vc-nav-height: 82px;
      }

      body.vc-has-internal-nav {
        padding-top: var(--vc-nav-height);
      }

      body.vc-has-internal-nav:not(.vc-dashboard-page) {
        display: block !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        padding-bottom: 0 !important;
      }

      body.vc-has-internal-nav .auth-container {
        margin: 24px auto 0;
      }

      body.vc-dashboard-page .sidebar {
        top: var(--vc-nav-height);
        height: calc(100vh - var(--vc-nav-height));
      }

      body.vc-dashboard-page .main-content {
        margin-top: var(--vc-nav-height);
        min-height: calc(100vh - var(--vc-nav-height));
      }

      .vc-internal-navbar {
        position: fixed;
        inset: 0 0 auto 0;
        height: var(--vc-nav-height);
        z-index: 1200;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(14px);
        border-bottom: 1px solid rgba(226, 232, 240, 0.92);
      }

      .vc-internal-navbar__inner,
      .vc-global-footer__inner,
      .vc-global-footer__bottom {
        width: min(1240px, calc(100% - 48px));
        margin: 0 auto;
      }

      .vc-internal-navbar__inner {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
      }

      .vc-brand {
        display: inline-flex;
        align-items: center;
        gap: 14px;
        text-decoration: none;
        flex-shrink: 0;
      }

      .vc-brand__mark {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f56372, #ff7a8a);
        color: white;
        box-shadow: 0 4px 12px rgba(245, 99, 114, 0.3);
        font-size: 1.2rem;
      }

      .vc-brand__text strong {
        display: block;
        font-size: 1rem;
        line-height: 1;
        color: #1e293b;
        letter-spacing: -0.02em;
        font-weight: 800;
      }

      .vc-brand__text span {
        display: block;
        margin-top: 2px;
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 700;
        color: var(--texto-suave);
      }

      .vc-internal-navbar__nav {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        flex: 1;
      }

      .vc-internal-navbar__nav a {
        text-decoration: none;
        color: var(--texto-titulo);
        font-size: 0.95rem;
        font-weight: 600;
        transition: color .2s ease;
        position: relative;
      }

      .vc-internal-navbar__nav a:hover,
      .vc-internal-navbar__nav a.is-active {
        color: var(--vermelho-vibrante);
      }

      .vc-internal-navbar__nav a::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -6px;
        width: 0;
        height: 3px;
        border-radius: 999px;
        background: var(--vermelho-vibrante);
        transition: width .3s ease;
      }

      .vc-internal-navbar__nav a:hover::after,
      .vc-internal-navbar__nav a.is-active::after {
        width: 100%;
      }

      .vc-internal-navbar__action {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        flex-shrink: 0;
        min-height: 44px;
        padding: 0 16px;
        border-radius: 8px;
        border: 2px solid var(--azul-primario);
        background: transparent;
        color: var(--azul-primario);
        font-size: 0.9rem;
        font-weight: 700;
        transition: all .3s ease;
      }

      .vc-internal-navbar__action:hover {
        background: var(--azul-primario);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(15, 41, 66, 0.2);
      }

      .vc-global-footer {
        margin-top: 0;
        background: var(--fundo);
        border-top: 1px solid var(--borda);
        width: 100%;
      }

      .vc-global-footer__inner {
        padding: 32px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;
        flex-wrap: wrap;
      }

      .vc-global-footer__bottom {
        padding: 0;
        border-top: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        color: var(--texto-suave);
        font-size: 0.85rem;
        font-weight: 500;
        text-align: center;
      }

      .vc-global-footer__meta {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        justify-content: center;
      }

      .vc-global-footer__meta a {
        text-decoration: none;
        color: var(--texto-suave);
        transition: color 0.3s ease;
      }

      .vc-global-footer__meta a:hover {
        color: var(--azul-primario);
      }

      body.vc-dashboard-page .vc-global-footer {
        margin-top: 48px;
      }

      @media (max-width: 768px) {
        .vc-global-footer__inner {
          flex-direction: column;
          gap: 20px;
          text-align: center;
        }

        .vc-global-footer__brand {
          justify-content: center;
          width: 100%;
        }
      }

      @media (max-width: 640px) {
        .vc-global-footer__inner {
          padding: 32px 0 24px;
        }

        .vc-global-footer__bottom {
          padding: 16px 0;
          font-size: 0.8rem;
        }
      }

      @media (max-width: 840px) {
        :root {
          --vc-nav-height: 76px;
        }

        .vc-internal-navbar__inner {
          gap: 14px;
        }

        .vc-internal-navbar__nav {
          display: none;
        }

        .vc-internal-navbar__action {
          padding: 0 14px;
          font-size: 0.84rem;
        }

        .vc-global-footer__inner,
        .vc-global-footer__bottom,
        .vc-internal-navbar__inner {
          width: min(1240px, calc(100% - 28px));
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createInternalNavbar(file) {
    const isUserArea = ['vitacare_dashboard_usuario.html', 'vitacare_detalhes_plano.html', 'vitacare_consultas_disponibilidade.html'].includes(file);
    const isBrokerArea = ['vitacare_dashboard_corretor.html', 'vitacare_cadastro_corretor.html', 'vitacare_login_corretor.html'].includes(file);

    let actionHref = 'index.html';
    let actionLabel = 'Voltar ao início';
    let actionIcon = 'fa-arrow-left';

    if (isUserArea && file !== 'vitacare_dashboard_usuario.html') {
      actionHref = 'vitacare_dashboard_usuario.html';
      actionLabel = 'Área do usuário';
      actionIcon = 'fa-user';
    } else if (isBrokerArea && file !== 'vitacare_dashboard_corretor.html') {
      actionHref = 'vitacare_dashboard_corretor.html';
      actionLabel = 'Área do corretor';
      actionIcon = 'fa-briefcase';
    }

    if (file === 'vitacare_dashboard_usuario.html' || file === 'vitacare_dashboard_corretor.html') {
      actionHref = 'index.html';
      actionLabel = 'Voltar ao início';
      actionIcon = 'fa-house';
    }

    const links = [
      { href: 'index.html', label: 'Início', match: ['index.html'] },
      { href: 'vitacare_planos.html', label: 'Planos', match: ['vitacare_planos.html', 'vitacare_inscricao_detalhada.html', 'vitacare_detalhes_plano.html'] },
      { href: 'index.html#sobre', label: 'Sobre', match: [] },
      { href: 'index.html#contato', label: 'Contato', match: [] }
    ];

    const navLinks = links.map(link => {
      const activeClass = link.match.includes(file) ? 'is-active' : '';
      return `<a href="${link.href}" class="${activeClass}">${link.label}</a>`;
    }).join('');

    return `
      <header class="vc-internal-navbar" aria-label="Navegação principal interna">
        <div class="vc-internal-navbar__inner">
          <a href="index.html" class="vc-brand" aria-label="VitaCare início">
            <span class="vc-brand__mark"><i class="fa-solid fa-heart-pulse"></i></span>
            <span class="vc-brand__text">
              <strong>VitaCare</strong>
              <span>Saúde Conectada</span>
            </span>
          </a>

          <nav class="vc-internal-navbar__nav">
            ${navLinks}
          </nav>

          <a href="${actionHref}" class="vc-internal-navbar__action">
            <i class="fa-solid ${actionIcon}"></i>
            ${actionLabel}
          </a>
        </div>
      </header>
    `;
  }

  function createFooter() {
    return `
      <footer class="vc-global-footer">
        <div class="vc-global-footer__bottom">
          <span>© 2026 VitaCare. Todos os direitos reservados.</span>
          <div class="vc-global-footer__meta">
            <a href="#">Privacidade</a>
            <a href="#">Termos de uso</a>
          </div>
        </div>
      </footer>
    `;
  }

  function removeExistingFooters() {
    document.querySelectorAll('footer').forEach(footer => footer.remove());
  }

  function addFooter(isDashboard) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = createFooter();
    const footer = wrapper.firstElementChild;

    if (isDashboard) {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.appendChild(footer);
        return;
      }
    }

    document.body.appendChild(footer);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const file = getCurrentFile();
    const isHome = file === 'index.html';
    const isDashboard = file === 'vitacare_dashboard_usuario.html' || file === 'vitacare_dashboard_corretor.html' || file === 'vitacare_detalhes_plano.html';

    injectStyles();
    removeExistingFooters();

    if (!isHome) {
      document.body.classList.add('vc-has-internal-nav');
      if (isDashboard || document.querySelector('.sidebar')) {
        document.body.classList.add('vc-dashboard-page');
      }
      document.body.insertAdjacentHTML('afterbegin', createInternalNavbar(file));
    }

    addFooter(isDashboard || !!document.querySelector('.sidebar'));
  });
})();
