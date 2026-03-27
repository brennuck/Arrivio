/* ============================================================
   ARRIVIO LANDING — INTERACTIONS & ANIMATIONS
   ============================================================ */

;(function () {
  'use strict'

  /* ---- NAV SCROLL EFFECT ---- */
  const nav = document.getElementById('nav')
  function checkNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40)
  }
  window.addEventListener('scroll', checkNavScroll, { passive: true })
  checkNavScroll()

  /* ---- REVEAL ON SCROLL ---- */
  const revealEls = document.querySelectorAll('.reveal')
  const dividers = document.querySelectorAll('.route-divider')
  const howSection = document.querySelector('.how-section')

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const delay = parseInt(entry.target.dataset.delay || '0', 10)
        setTimeout(() => entry.target.classList.add('visible'), delay)
        revealObserver.unobserve(entry.target)
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  )

  revealEls.forEach((el) => revealObserver.observe(el))

  const dividerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          dividerObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )
  dividers.forEach((el) => dividerObserver.observe(el))

  if (howSection) {
    const howObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            howObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    howObserver.observe(howSection)
  }

  /* ---- COUNTER ANIMATION ---- */
  const counters = document.querySelectorAll('.stat-number[data-count]')

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        animateCounter(entry.target)
        counterObserver.unobserve(entry.target)
      })
    },
    { threshold: 0.5 }
  )

  counters.forEach((el) => counterObserver.observe(el))

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10)
    const duration = 1600
    const startTime = performance.now()

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = Math.round(eased * target)

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        el.textContent = target
      }
    }

    requestAnimationFrame(tick)
  }

  /* ---- DEMO INTERACTION ---- */
  const demoInput = document.getElementById('demo-address')
  const demoEmpty = document.getElementById('demo-empty')
  const demoResults = document.getElementById('demo-results')
  const demoRows = document.getElementById('demo-rows')

  const samplePlaces = [
    { name: 'Work', min: 8, max: 35 },
    { name: 'Gym', min: 5, max: 20 },
    { name: "Mom's House", min: 15, max: 45 },
    { name: 'Downtown', min: 10, max: 30 },
    { name: 'Kids\' School', min: 6, max: 25 },
  ]

  let demoTimeout = null

  if (demoInput) {
    demoInput.addEventListener('input', () => {
      clearTimeout(demoTimeout)
      const val = demoInput.value.trim()

      if (!val) {
        demoEmpty.style.display = ''
        demoResults.style.display = 'none'
        return
      }

      demoTimeout = setTimeout(() => showDemoResults(), 400)
    })
  }

  function showDemoResults() {
    demoEmpty.style.display = 'none'
    demoResults.style.display = ''
    demoRows.innerHTML = ''

    samplePlaces.forEach((place, i) => {
      const mins = place.min + Math.floor(Math.random() * (place.max - place.min))
      let color = 'var(--green)'
      if (mins > 30) color = 'var(--red)'
      else if (mins > 20) color = 'var(--amber)'

      const row = document.createElement('div')
      row.className = 'demo-row demo-stagger'
      row.style.animationDelay = `${i * 80}ms`

      row.innerHTML = `
        <div class="demo-row-left">
          <div class="demo-row-dot" style="background:${color}"></div>
          <span class="demo-row-name">${place.name}</span>
        </div>
        <span class="demo-row-time" style="color:${color}">${mins} min</span>
      `
      demoRows.appendChild(row)
    })
  }

  /* ---- MOCKUP WIDGET TABS ---- */
  const mockupData = {
    now:      [{ name: 'Work', min: 12, c: 'var(--green)' }, { name: 'Gym', min: 8, c: 'var(--green)' }, { name: "Mom's House", min: 27, c: 'var(--amber)' }, { name: 'Downtown', min: 15, c: 'var(--green)' }],
    am_rush:  [{ name: 'Work', min: 24, c: 'var(--amber)' }, { name: 'Gym', min: 11, c: 'var(--green)' }, { name: "Mom's House", min: 38, c: 'var(--red)' }, { name: 'Downtown', min: 22, c: 'var(--amber)' }],
    pm_rush:  [{ name: 'Work', min: 31, c: 'var(--red)' }, { name: 'Gym', min: 14, c: 'var(--green)' }, { name: "Mom's House", min: 42, c: 'var(--red)' }, { name: 'Downtown', min: 28, c: 'var(--amber)' }],
  }

  const mwTabs = document.querySelectorAll('.mw-tab')
  const mwPanel = document.querySelector('.mockup-widget .mw-panel')
  const tabKeys = ['now', 'am_rush', 'pm_rush']

  function renderMockupRows(key) {
    if (!mwPanel) return
    const rows = mockupData[key] || mockupData.now
    mwPanel.innerHTML = rows.map(function (r) {
      return '<div class="mw-row"><span class="mw-left"><span class="mw-dot" style="background:' + r.c + '"></span><span class="mw-name">' + r.name + '</span></span><span class="mw-time" style="color:' + r.c + '">' + r.min + ' min</span></div>'
    }).join('')
  }

  mwTabs.forEach(function (tab, i) {
    tab.style.cursor = 'pointer'
    tab.addEventListener('click', function () {
      mwTabs.forEach(function (t) { t.classList.remove('active') })
      tab.classList.add('active')
      renderMockupRows(tabKeys[i])
    })
  })

  /* ---- PARALLAX SUBTLE ---- */
  let ticking = false
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const heroRoute = document.querySelector('.hero-route')
          if (heroRoute) {
            heroRoute.style.transform = `translateY(${scrollY * 0.08}px)`
          }
          ticking = false
        })
        ticking = true
      }
    },
    { passive: true }
  )
})()
