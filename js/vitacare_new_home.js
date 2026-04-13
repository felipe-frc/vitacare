// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 8px rgba(30, 41, 59, 0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// Carousel Manager
class CarouselManager {
  constructor(trackId, prevBtnId, nextBtnId, indicatorsId, itemsPerView = 3) {
    this.track = document.getElementById(trackId);
    this.prevBtn = document.getElementById(prevBtnId);
    this.nextBtn = document.getElementById(nextBtnId);
    this.indicatorsContainer = document.getElementById(indicatorsId);
    this.itemsPerView = itemsPerView;
    this.currentIndex = 0;
    this.autoPlayInterval = null;

    if (!this.track) return;

    this.items = this.track.querySelectorAll('.review-card');
    this.totalItems = this.items.length;
    this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);

    this.init();
  }

  init() {
    this.createIndicators();
    this.attachEventListeners();
    this.updateCarousel();
    this.startAutoPlay();
    this.addResizeListener();
  }

  createIndicators() {
    if (!this.indicatorsContainer) return;

    this.indicatorsContainer.innerHTML = '';
    const indicatorCount = this.totalItems - this.itemsPerView + 1;

    for (let i = 0; i < indicatorCount; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => this.goToSlide(i));
      this.indicatorsContainer.appendChild(indicator);
    }
  }

  attachEventListeners() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
  }

  updateCarousel() {
    const offset = -(this.currentIndex * (100 / this.itemsPerView + 0.8));
    this.track.style.transform = `translateX(${offset}%)`;

    // Update indicators
    const indicators = this.indicatorsContainer?.querySelectorAll('.indicator');
    if (indicators) {
      indicators.forEach((ind, idx) => {
        ind.classList.toggle('active', idx === this.currentIndex);
      });
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % (this.totalItems - this.itemsPerView + 1);
    this.updateCarousel();
    this.resetAutoPlay();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + (this.totalItems - this.itemsPerView + 1)) % (this.totalItems - this.itemsPerView + 1);
    this.updateCarousel();
    this.resetAutoPlay();
  }

  goToSlide(index) {
    this.currentIndex = Math.min(index, this.maxIndex);
    this.updateCarousel();
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 6000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }

  destroy() {
    clearInterval(this.autoPlayInterval);
  }

  updateItemsPerView(newValue) {
    this.itemsPerView = newValue;
    this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
    this.createIndicators();
    this.updateCarousel();
  }
}

// Initialize carousels when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Reviews carousel
  const reviewsCarousel = new CarouselManager(
    'reviewsTrack',
    'reviewsPrev',
    'reviewsNext',
    'reviewsIndicators',
    3
  );

  // Handle responsive carousel
  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 768) {
      reviewsCarousel.updateItemsPerView(1);
    } else if (width < 1024) {
      reviewsCarousel.updateItemsPerView(2);
    } else {
      reviewsCarousel.updateItemsPerView(3);
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe benefit and plan cards
  document.querySelectorAll('.benefit-item, .plan-card, .review-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const inputs = contactForm.querySelectorAll('input, textarea');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
        }
      });

      if (isValid) {
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = '✓ Mensagem enviada com sucesso!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
          contactForm.reset();
          btn.textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }
    });
  }

  // Add ripple effect to buttons
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
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
  .btn-primary,
  .btn-secondary {
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
