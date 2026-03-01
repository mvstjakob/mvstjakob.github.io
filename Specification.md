# Implementation Specification

## Single Page Site (Vertical + Horizontal Scroll Sections)

---

## 1. Objective

Build a fully responsive, static, single-page website with:

* Vertical scroll layout
* Multiple horizontal scroll (carousel-like) sections
* Scroll-triggered animations
* Clean, minimal implementation
* Static deploy output

---

## 2. Tech Stack (Mandatory)

* Build tool: Vite
* Styling: Tailwind CSS
* Animation: GSAP
* GSAP Plugin: ScrollTrigger

No other UI frameworks allowed.

---

## 3. Required Page Structure (Top → Bottom)

All sections must be in this exact order:

1. **Header**
2. **Welcome Section**
3. **Social Media Section**
5. **Contact Section**
6. **Team Section**
7. **History Section**
8. **Imprint**

---

## 4. Section Specifications

---

### 4.1 Header

**Behavior**

* Sticky at top
* Transparent initially
* Optional background color after scroll

**Content**

* Logo (left)
* Menu items (right)
* Mobile hamburger menu

**Technical**

* `position: fixed`
* `w-full`
* Responsive menu toggle (minimal JS)

---

### 4.2 Welcome Section

**Layout**

* Full-screen hero (`min-h-screen`)
* Large background image
* Centered slogan text

**Animation**

* Fade-in headline
* Slight upward motion
* Trigger on load or first scroll

---

### 4.3 News Section

This may use horizontal scroll behavior.

#### Desktop Behavior:

* Horizontal scrolling panels
* Pinned section
* Scrubbed horizontal movement

#### Mobile Behavior:

* Stacked vertical feed
* No pinning

#### Structure:

```html
<section class="horizontal-section insta">
  <div class="horizontal-wrapper">
    <div class="panel">Post 1</div>
    <div class="panel">Post 2</div>
    <div class="panel">Post 3</div>
  </div>
</section>
```

#### Notes:

* No external carousel library
* Use GSAP ScrollTrigger
* Animate via `transform: translateX`
* No autoplay behavior
* It should contain placeholders for the 3 most recent insta posts
* include facebook, insta and youtube social links below the post carousel (but always visible)

If real Instagram API integration is added later, it must not block rendering.

---

### 4.4 Contact Section

Content:

* Address
* Email
* Phone
* Optional embedded map (static iframe only)

Layout:

* Responsive 1 column (mobile)
* 2 column (desktop)

Reveal animation on scroll.

---

### 4.5 Team Section (Horizontal Scroll Required)

Must use pinned horizontal scroll.

Structure identical to horizontal template:

```html
<section class="horizontal-section team">
  <div class="horizontal-wrapper">
    <div class="panel">Member 1</div>
    <div class="panel">Member 2</div>
    <div class="panel">Member 3</div>
  </div>
</section>
```

Each panel:

* Full viewport width
* Profile image
* Name
* Role
* Short description

Mobile:

* Stack vertically
* Disable pinning

---

### 4.6 History Section (Horizontal Scroll Required)

Same technical structure as Team section.

Each panel:

* Year
* Headline
* Description
* Optional image

Scroll must feel like timeline storytelling.

Mobile:

* Vertical stacked timeline

---

### 4.7 Imprint Section

Final static section:

* Legal information
* Company data
* Contact details

No animation required (optional subtle fade-in).

---

## 5. Horizontal Scroll Implementation Rules

For ALL horizontal sections:

### Requirements

* Pin section
* Scrub animation
* Calculate scroll width dynamically
* Use `ScrollTrigger.matchMedia()` to disable on mobile

### Animation Settings

* scrub: true
* pin: true
* ease: "none"
* anticipatePin: 1
* markers: false

### Performance

* Animate transform only
* No width/left animation
* No manual scroll listeners

---

## 6. Vertical Reveal Animations

For standard sections:

* opacity: 0 → 1
* y: 50 → 0
* duration: ~1s
* ease: power2.out
* trigger when entering viewport
* no scrub

---

## 7. Responsive Requirements

Mobile-first design using Tailwind breakpoints:

* sm
* md
* lg
* xl

Rules:

* Horizontal sections convert to vertical on mobile
* Typography scales responsively
* Header menu collapses on small screens

No custom CSS media queries unless unavoidable.

---

## 8. Accessibility

* Proper heading hierarchy
* Keyboard accessible navigation
* No scroll traps
* Content readable without JS
* Images use alt attributes

---

## 9. Performance Constraints

* No external slider libraries
* No unnecessary dependencies
* Minimal DOM queries
* Production build via `npm run build`
* No console errors

---

## 10. Acceptance Criteria

The implementation is complete when:

* Header remains sticky
* Welcome section fills viewport
* Insta, Team, and History scroll horizontally on desktop
* Horizontal sections stack vertically on mobile
* All vertical sections animate in
* No layout shifts
* Production build outputs optimized static files

---

If you'd like next, I can provide:

* A structural HTML wireframe
* The exact GSAP logic for multiple horizontal sections
* Or a visual layout architecture diagram for the scroll flow
