/* ===========================
   LOADER
=========================== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader')
    if (loader) loader.classList.add('hide')
  }, 1700)
})

/* ===========================
   CURSOR PERSONALIZADO (DESKTOP)
=========================== */
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.getElementById('cursor')
  const ring = document.getElementById('cursorRing')

  let mouseX = 0, mouseY = 0
  let ringX = 0, ringY = 0

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursor.style.left = mouseX + 'px'
    cursor.style.top = mouseY + 'px'
  })

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12
    ringY += (mouseY - ringY) * 0.12
    ring.style.left = ringX + 'px'
    ring.style.top = ringY + 'px'
    requestAnimationFrame(animateRing)
  }
  animateRing()

  document.querySelectorAll(
    'a, button, .faq-q, .serv-card, .pq-card, .ci-item'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '5px'
      cursor.style.height = '5px'
      ring.style.width = '54px'
      ring.style.height = '54px'
      ring.style.opacity = '0.3'
    })
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px'
      cursor.style.height = '10px'
      ring.style.width = '36px'
      ring.style.height = '36px'
      ring.style.opacity = '0.5'
    })
  })
}

/* ===========================
   NAVBAR SCROLL + BACK TO TOP
=========================== */
const navbar = document.getElementById('navbar')
const backTop = document.getElementById('backTop')

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60)

  if (backTop) {
    backTop.classList.toggle('show', window.scrollY > 400)
  }
})

if (backTop) {
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

/* ===========================
   MENU MOBILE
=========================== */
const mobMenu = document.getElementById('mobMenu')
const hamburger = document.getElementById('hamburger')
const mobClose = document.getElementById('mobClose')

if (hamburger && mobMenu) {
  hamburger.addEventListener('click', () => {
    mobMenu.style.display = 'flex'
    requestAnimationFrame(() => mobMenu.classList.add('open'))
    mobMenu.setAttribute('aria-hidden', 'false')
  })
}

function closeMob() {
  mobMenu.classList.remove('open')
  mobMenu.setAttribute('aria-hidden', 'true')
  setTimeout(() => {
    mobMenu.style.display = 'none'
  }, 350)
}

if (mobClose) {
  mobClose.addEventListener('click', closeMob)
}

/* ===========================
   REVEAL ON SCROLL (CORRIGIDO)
=========================== */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.1 })

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el)
})

/* ===========================
   FAQ ACCORDION
=========================== */
const faqList = document.getElementById('faqList')

if (faqList) {
  const openItem = faqList.querySelector('.faq-item.open')
  if (openItem) {
    const content = openItem.querySelector('.faq-a')
    const inner = openItem.querySelector('.faq-a-inner')
    content.style.maxHeight = inner.scrollHeight + 'px'
  }

  faqList.addEventListener('click', e => {
    const item = e.target.closest('.faq-item')
    if (!item) return

    const isOpen = item.classList.contains('open')

    faqList.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open')
      const a = i.querySelector('.faq-a')
      if (a) a.style.maxHeight = '0'
    })

    if (!isOpen) {
      item.classList.add('open')
      const a = item.querySelector('.faq-a')
      const inner = item.querySelector('.faq-a-inner')
      a.style.maxHeight = inner.scrollHeight + 'px'
    }
  })
}

/* ===========================
   FORMULÁRIO (SIMULAÇÃO)
=========================== */
const form = document.getElementById('contactForm')
const snack = document.getElementById('snack')

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault()

    const btn = form.querySelector('.form-submit')
    btn.textContent = 'Enviando...'
    btn.disabled = true

    setTimeout(() => {
      form.reset()
      btn.textContent = 'Enviar mensagem'
      btn.disabled = false

      if (snack) {
        snack.classList.add('show')
        setTimeout(() => snack.classList.remove('show'), 3500)
      }
    }, 1200)
  })
}
