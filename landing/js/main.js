/* ============================================
   ARRIVIO LANDING — Scroll Animations + Demo
   ============================================ */

;(function () {
  'use strict'

  // ---- Scroll reveal ----
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0', 10)
          setTimeout(() => entry.target.classList.add('visible'), delay)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

  // ---- Nav scroll effect ----
  const nav = document.getElementById('nav')
  window.addEventListener(
    'scroll',
    () => {
      nav.classList.toggle('scrolled', window.scrollY > 40)
    },
    { passive: true },
  )

  // ---- Interactive demo ----
  const demoInput = document.getElementById('demo-address')
  const demoEmpty = document.getElementById('demo-empty')
  const demoResults = document.getElementById('demo-results')
  const demoRows = document.getElementById('demo-rows')

  const samplePlaces = [
    { name: 'Work', range: [8, 35] },
    { name: 'Gym', range: [4, 20] },
    { name: "Mom's House", range: [15, 50] },
    { name: 'Downtown', range: [10, 30] },
    { name: 'Airport', range: [20, 55] },
  ]

  function hashString(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) | 0
    }
    return Math.abs(hash)
  }

  function timeColor(min) {
    if (min <= 15) return 'var(--green)'
    if (min <= 30) return 'var(--amber)'
    return 'var(--red)'
  }

  function formatTime(min) {
    if (min < 60) return min + ' min'
    var h = Math.floor(min / 60)
    var m = min % 60
    return m > 0 ? h + 'h ' + m + 'm' : h + 'h'
  }

  let debounce = null
  demoInput.addEventListener('input', function () {
    clearTimeout(debounce)
    const val = demoInput.value.trim()

    if (!val) {
      demoEmpty.style.display = ''
      demoResults.style.display = 'none'
      return
    }

    debounce = setTimeout(function () {
      const seed = hashString(val)
      demoRows.innerHTML = ''

      samplePlaces.forEach(function (place, i) {
        const spread = place.range[1] - place.range[0]
        const minutes =
          place.range[0] + ((seed + i * 7) % (spread + 1))

        const row = document.createElement('div')
        row.className = 'dw-row'
        row.style.animationDelay = i * 80 + 'ms'

        var nameSpan = document.createElement('span')
        nameSpan.className = 'dw-row-name'
        nameSpan.textContent = place.name

        var timeSpan = document.createElement('span')
        timeSpan.className = 'dw-row-time'
        timeSpan.textContent = formatTime(minutes)
        timeSpan.style.color = timeColor(minutes)

        row.appendChild(nameSpan)
        row.appendChild(timeSpan)
        demoRows.appendChild(row)
      })

      demoEmpty.style.display = 'none'
      demoResults.style.display = ''
    }, 300)
  })
})()
