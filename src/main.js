import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ---------------------------------------------------------------------------
// 1. Welcome section — fade-in headline on load
// ---------------------------------------------------------------------------
gsap.from('.hero-headline', {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power2.out',
})

gsap.from('.hero-sub', {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.3,
  ease: 'power2.out',
})

gsap.from('.hero-cta', {
  opacity: 0,
  y: 20,
  duration: 0.8,
  delay: 0.6,
  ease: 'power2.out',
})

// ---------------------------------------------------------------------------
// 1b. Welcome section — background slideshow
// ---------------------------------------------------------------------------
const slides = gsap.utils.toArray('.slider-slide')

if (slides.length > 1) {
  let current = 0

  function nextSlide() {
    const prev = current
    current = (current + 1) % slides.length

    gsap.to(slides[prev], { opacity: 0, duration: 1.2, ease: 'power2.inOut' })
    gsap.to(slides[current], { opacity: 1, duration: 1.2, ease: 'power2.inOut' })
  }

  setInterval(nextSlide, 5000)
}

// ---------------------------------------------------------------------------
// 2. Horizontal scroll sections — desktop only
// ---------------------------------------------------------------------------
const mm = gsap.matchMedia()

// Stores active ScrollTrigger instances keyed by section id, for nav scrolling
const horizontalTriggers = {}

/**
 * Sets up a pinned horizontal scroll animation for a section.
 * @param {string} sectionSelector - CSS selector for the outer section element.
 */
function setupHorizontalSection(sectionSelector) {
  const section = document.querySelector(sectionSelector)
  if (!section) return

  const wrapper = section.querySelector('.horizontal-wrapper')
  if (!wrapper) return

  mm.add('(min-width: 768px)', () => {
    const totalWidth = wrapper.scrollWidth
    const viewportWidth = window.innerWidth
    const distance = totalWidth - viewportWidth

    const tween = gsap.to(wrapper, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        markers: false,
        invalidateOnRefresh: true,
      },
    })

    if (section.id) horizontalTriggers[section.id] = tween.scrollTrigger

    // Return cleanup function for matchMedia
    return () => {
      if (section.id) delete horizontalTriggers[section.id]
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(wrapper, { x: 0 })
    }
  })
}

setupHorizontalSection('.horizontal-section.insta')
setupHorizontalSection('.horizontal-section.team')
setupHorizontalSection('.horizontal-section.history')

// ---------------------------------------------------------------------------
// 2b. Anchor nav — scroll to start of pinned sections on desktop
// ---------------------------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1)
    const st = horizontalTriggers[id]
    if (st) {
      e.preventDefault()
      window.scrollTo({ top: st.start, behavior: 'smooth' })
    }
  })
})

// ---------------------------------------------------------------------------
// 3. Vertical reveal animations
// ---------------------------------------------------------------------------
gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })
})

// ---------------------------------------------------------------------------
// 4. Header — gain background on scroll
// ---------------------------------------------------------------------------
const header = document.getElementById('site-header')

if (header) {
  ScrollTrigger.create({
    start: 'top -80',
    onEnter: () => header.classList.add('bg-white', 'shadow-md'),
    onLeaveBack: () => header.classList.remove('bg-white', 'shadow-md'),
  })
}

// ---------------------------------------------------------------------------
// 5. Hamburger — toggle mobile nav
// ---------------------------------------------------------------------------
const hamburger = document.getElementById('hamburger')
const mobileNav = document.getElementById('mobile-nav')

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = !mobileNav.classList.contains('hidden')

    if (isOpen) {
      mobileNav.classList.add('hidden')
      hamburger.setAttribute('aria-expanded', 'false')
    } else {
      mobileNav.classList.remove('hidden')
      hamburger.setAttribute('aria-expanded', 'true')
    }
  })

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden')
      hamburger.setAttribute('aria-expanded', 'false')
    })
  })
}
