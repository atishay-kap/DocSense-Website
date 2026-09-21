(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  const progress = document.querySelector('.page-progress span');
  const featureRows = document.querySelectorAll('.feature-row');
  const reelCards = [...document.querySelectorAll('.reel-card')];

  const updateProgress = () => {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const amount = distance > 0 ? (window.scrollY / distance) * 100 : 0;
    progress?.style.setProperty('--scroll-progress', `${amount}%`);
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(element => element.classList.add('is-visible'));
    featureRows.forEach((row, index) => row.classList.toggle('is-active', index === 0));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    reveals.forEach(element => revealObserver.observe(element));

    const featureObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        featureRows.forEach(row => row.classList.toggle('is-active', row === entry.target));
      });
    }, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
    featureRows.forEach(row => featureObserver.observe(row));
  }

  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('pointermove', event => {
      if (reducedMotion) return;
      const rect = button.getBoundingClientRect();
      button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .12}px, ${(event.clientY - rect.top - rect.height / 2) * .16}px)`;
    });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });

  const setActiveCard = card => reelCards.forEach(item => item.classList.toggle('is-active', item === card));
  reelCards.forEach(card => {
    card.addEventListener('pointerenter', () => setActiveCard(card));
    card.addEventListener('focusin', () => setActiveCard(card));
    card.addEventListener('click', () => setActiveCard(card));
  });

  const viewer = document.querySelector('.media-viewer');
  const viewerImage = viewer?.querySelector('.media-viewer__image');
  const viewerTitle = viewer?.querySelector('.media-viewer__title');
  const closeViewer = () => viewer?.close();
  const openViewer = image => {
    if (!viewer || !viewerImage) return;
    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt;
    viewerTitle.textContent = image.alt || 'Workspace screen';
    viewer.showModal();
    viewer.querySelector('.media-viewer__close')?.focus();
  };

  document.querySelectorAll('.feature-shot img, .reel-card img').forEach(image => {
    image.closest('.feature-shot, .reel-card')?.setAttribute('tabindex', '0');
    image.addEventListener('click', event => {
      event.stopPropagation();
      openViewer(image);
    });
    image.closest('.feature-shot, .reel-card')?.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openViewer(image);
      }
    });
  });

  viewer?.querySelector('.media-viewer__close')?.addEventListener('click', closeViewer);
  viewer?.addEventListener('click', event => {
    if (event.target === viewer) closeViewer();
  });

  document.querySelectorAll('video').forEach(video => {
    video.play().catch(() => { video.controls = true; });
  });
})();
