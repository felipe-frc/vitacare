function showSection(sectionId, element) {
  document.querySelectorAll('.dashboard-section').forEach((section) => section.classList.remove('active'));
  document.querySelectorAll('.nav-link[data-section-target]').forEach((link) => link.classList.remove('active'));

  document.getElementById(sectionId)?.classList.add('active');
  element?.classList.add('active');
}

function openSectionById(sectionId) {
  const navLink = document.querySelector(`.nav-link[data-section-target="${sectionId}"]`);
  if (navLink) {
    showSection(sectionId, navLink);
  }
}

document.addEventListener('click', (event) => {
  const navLink = event.target.closest('.nav-link[data-section-target]');
  if (navLink) {
    event.preventDefault();
    showSection(navLink.dataset.sectionTarget, navLink);
    return;
  }

  const openSectionTrigger = event.target.closest('[data-open-section]');
  if (openSectionTrigger) {
    event.preventDefault();
    openSectionById(openSectionTrigger.dataset.openSection);
  }
});
