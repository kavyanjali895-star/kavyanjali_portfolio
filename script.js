/* Small, dependency-free interactions for the portfolio page. */
(() => {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const desktopNav = document.querySelector('.desktop-nav');
  const siteHeader = document.querySelector('.site-header');

  if (mobileToggle && desktopNav && siteHeader) {
    const mobileNav = document.createElement('nav');
    mobileNav.id = 'mobile-nav';
    mobileNav.className = 'mobile-nav';
    mobileNav.setAttribute('aria-label', 'Mobile navigation');
    mobileNav.hidden = true;

    desktopNav.querySelectorAll('a').forEach((link) => {
      const item = link.cloneNode(true);
      item.classList.remove('current');
      item.addEventListener('click', () => setMenuOpen(false));
      mobileNav.append(item);
    });

    const headerInner = siteHeader.querySelector('.header-inner');
    if (headerInner) headerInner.insertAdjacentElement('afterend', mobileNav);
    else siteHeader.append(mobileNav);

    function setMenuOpen(open) {
      mobileNav.hidden = !open;
      mobileToggle.setAttribute('aria-expanded', String(open));
      mobileToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      mobileToggle.innerHTML = open
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>';
    }

    mobileToggle.addEventListener('click', () => {
      setMenuOpen(mobileToggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 850) setMenuOpen(false);
    });
  }

  const stages = [
    {
      title: 'Building the Foundation',
      points: [
        'Strengthen core biotechnology concepts.',
        'Develop a sound understanding of biology and chemistry.',
        'Explore fundamental laboratory and scientific research methods through coursework.',
      ],
    },
    {
      title: 'Exploring Interdisciplinary Skills',
      points: [
        'Begin exploring computational biology and bioinformatics tools.',
        'Learn introductory data analysis and relevant programming concepts.',
        'Understand the fundamentals of food processing, quality, and pharmaceutical research.',
      ],
    },
    {
      title: 'Applying Scientific Knowledge',
      points: [
        'Work toward academic and personal projects.',
        'Explore suitable internships and research opportunities.',
        'Build a portfolio of verified projects, practical learning, and future achievements.',
      ],
    },
  ];
  const stageTabs = [...document.querySelectorAll('.roadmap-tab[role="tab"]')];
  const stagePanel = document.querySelector('#stage-panel');

  function showStage(index) {
    const stage = stages[index];
    if (!stage || !stagePanel) return;
    stageTabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.classList.toggle('selected', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    stagePanel.setAttribute('aria-labelledby', `stage-${index}`);
    const title = stagePanel.querySelector('h3');
    const kicker = stagePanel.querySelector('.small-kicker');
    const list = stagePanel.querySelector('ul');
    if (title) title.textContent = stage.title;
    if (kicker) kicker.textContent = `STAGE 0${index + 1} · LEARNING GOALS`;
    if (list) {
      list.replaceChildren(...stage.points.map((point) => {
        const item = document.createElement('li');
        const marker = document.createElement('span');
        const text = document.createElement('p');
        text.textContent = point;
        item.append(marker, text);
        return item;
      }));
    }
  }

  stageTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showStage(index));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % stageTabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + stageTabs.length) % stageTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = stageTabs.length - 1;
      stageTabs[next]?.focus();
      showStage(next);
    });
  });

  const form = document.querySelector('.contact-form');
  if (form) {
    const feedback = document.createElement('p');
    feedback.className = 'form-feedback';
    feedback.setAttribute('role', 'status');
    feedback.hidden = true;
    form.append(feedback);

    function setFieldError(field, message) {
      const wrapper = field.closest('.field');
      let error = wrapper?.querySelector('.field-error');
      if (!error && wrapper) {
        error = document.createElement('span');
        error.className = 'field-error';
        error.id = `${field.id}-error`;
        wrapper.append(error);
      }
      field.setAttribute('aria-invalid', String(Boolean(message)));
      if (message && error) {
        error.textContent = message;
        field.setAttribute('aria-describedby', error.id);
      } else {
        error?.remove();
        field.removeAttribute('aria-describedby');
      }
    }

    form.querySelectorAll('input, textarea').forEach((field) => {
      field.addEventListener('input', () => setFieldError(field, ''));
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      feedback.hidden = true;
      feedback.classList.remove('success');
      const honeypot = form.querySelector('#website');
      if (honeypot?.value) return;

      const fields = ['name', 'email', 'subject', 'message'].map((id) => form.querySelector(`#${id}`));
      let valid = true;
      fields.forEach((field) => {
        let message = '';
        if (!field.value.trim()) message = 'Please complete this field.';
        else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
          message = 'Enter a valid email address.';
        }
        setFieldError(field, message);
        if (message) valid = false;
      });
      if (!valid) {
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }

      const [name, email, subject, message] = fields.map((field) => field.value.trim());
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailto = `mailto:kavyanjali895@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      feedback.textContent = 'Your email app will open with your message. Review it and send when ready.';
      feedback.classList.add('success');
      feedback.hidden = false;
      window.location.href = mailto;
    });
  }
})();
