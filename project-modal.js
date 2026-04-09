function openProject(imgSrc) {
  // Only trigger popup on mobile/tablet (screen < 900px)
  if (window.innerWidth < 900) {
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImg');
    modalImg.src = imgSrc;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeProject() {
  const modal = document.getElementById('projectModal');
  modal.classList.remove('open');
  document.body.style.overflow = ''; // Restore scrolling
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProject();
});
