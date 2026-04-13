// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 8px rgba(30, 41, 59, 0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const usuario = document.getElementById('usuario').value.trim();
      const senha = document.getElementById('senha').value.trim();

      if (!usuario || !senha) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos.');
      }
    });
  }

  // Social buttons navigation
  const socialButtons = document.querySelectorAll('.btn-outline[data-nav]');
  socialButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = btn.dataset.nav;
    });
  });

  // Add ripple effect to buttons
  document.querySelectorAll('.btn-login, .btn-outline').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
  .btn-login,
  .btn-outline {
    position: relative;
    overflow: hidden;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
