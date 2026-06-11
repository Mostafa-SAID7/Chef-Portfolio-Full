# Styling Guide - Tailwind CSS

Complete guide to the custom styling system for FullyPorto.

## Overview

The project uses **Tailwind CSS** with extensive custom utilities and design tokens. All styles are centralized in:

- `src/styles.css` - Global styles and custom utilities
- `tailwind.config.js` - Tailwind configuration
- CSS Custom Properties (CSS Variables) for theming

## Design System

### Color Palette

#### Dark Theme (Default)
- **Background:** `#0A0A0A` - Deep black
- **Foreground:** `#FAFAFA` - Off-white
- **Primary/Accent:** `#E8C547` - Golden yellow
- **Secondary:** `#1A1A1A` - Dark gray
- **Muted:** `#888888` - Medium gray
- **Card:** `#111111` - Card background
- **Border:** `#222222` - Subtle border

#### Light Theme
- **Background:** `#FAFAFA` - Off-white
- **Foreground:** `#0A0A0A` - Deep black
- **Primary/Accent:** `#C9A832` - Darker gold
- **Secondary:** `#F0F0F0` - Light gray
- **Muted:** `#666666` - Medium gray
- **Card:** `#FFFFFF` - White
- **Border:** `#E5E5E5` - Light border

### Typography

#### Fonts
- **Primary (English):** Plus Jakarta Sans
- **Arabic:** Tajawal
- **Monospace:** JetBrains Mono

#### Custom Text Utilities

```html
<!-- Hero Text (Extra Large) -->
<h1 class="text-hero-xl">Portfolio</h1>

<!-- Section Text (Large) -->
<h2 class="text-section-xl">About Me</h2>

<!-- Monolith Background Text -->
<div class="text-monolith">DESIGN</div>

<!-- Gradient Text -->
<span class="gradient-text">Highlighted</span>

<!-- Section Label -->
<span class="section-label">Projects</span>
```

## Custom Utilities

### Glass Morphism

```html
<!-- Regular Glass Card -->
<div class="glass-card p-6 rounded-lg">
  <p>Content with glass effect</p>
</div>

<!-- Strong Glass Card -->
<div class="glass-card-strong p-8 rounded-xl">
  <h3>Stronger blur effect</h3>
</div>
```

### Glow Effects

```html
<!-- Accent Glow -->
<div class="accent-glow rounded-lg p-4">
  <p>Subtle golden glow</p>
</div>

<!-- Strong Accent Glow -->
<button class="accent-glow-strong btn-primary">
  Glowing Button
</button>

<!-- Border with Glow -->
<div class="border-accent-glow border-2 rounded p-4">
  <p>Glowing border</p>
</div>
```

### Animations

#### Built-in Animations

```html
<!-- Float Animation -->
<div class="animate-float">
  <img src="icon.svg" alt="Floating icon">
</div>

<!-- Slow Spin -->
<div class="animate-spin-slow">
  <svg>...</svg>
</div>

<!-- Reverse Spin -->
<div class="animate-spin-reverse">
  <svg>...</svg>
</div>

<!-- Pulse Glow -->
<button class="animate-pulse-glow">
  Pulsing Button
</button>

<!-- Typing Cursor -->
<span class="typing-cursor"></span>
```

#### Reveal Animations

```html
<!-- Reveal from Bottom -->
<div class="reveal-up" data-reveal>
  <h2>Appears on scroll</h2>
</div>

<!-- Reveal from Left -->
<div class="reveal-left" data-reveal>
  <p>Slides in from left</p>
</div>
```

**JavaScript to trigger:**
```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
});

document.querySelectorAll('[data-reveal]').forEach(el => {
  observer.observe(el);
});
```

### Buttons

```html
<!-- Primary Button -->
<button class="btn-primary">
  Get Started
</button>

<!-- Outline Button -->
<button class="btn-outline">
  Learn More
</button>

<!-- Filter Button -->
<button class="filter-btn active">
  All
</button>
<button class="filter-btn">
  Design
</button>
```

### Form Inputs

```html
<!-- Text Input -->
<input type="text" class="form-input" placeholder="Your name">

<!-- Error State -->
<input type="email" class="form-input error" placeholder="Email">

<!-- Textarea -->
<textarea class="form-input" rows="5" placeholder="Message"></textarea>
```

### Tags & Badges

```html
<!-- Skill Tags -->
<span class="tag-skill">React</span>
<span class="tag-skill">TypeScript</span>
<span class="tag-skill">Tailwind</span>
```

### Progress Bar

```html
<div class="progress-bar">
  <div class="progress-fill" style="--progress: 75%"></div>
</div>

<!-- With JavaScript -->
<div class="progress-bar">
  <div class="progress-fill active" style="transform: scaleX(0.75)"></div>
</div>
```

### Navigation

```html
<!-- Nav Link with Underline Effect -->
<a href="#" class="nav-link-hover">About</a>
<a href="#" class="nav-link-hover">Projects</a>
<a href="#" class="nav-link-hover">Contact</a>
```

### Cards

```html
<!-- Project Card with Hover -->
<div class="project-card-hover glass-card rounded-xl p-6">
  <img src="project.jpg" alt="Project">
  <h3 class="text-xl font-bold mt-4">Project Title</h3>
  <p class="text-muted-foreground">Description</p>
</div>
```

### Blobs & Background Effects

```html
<!-- Accent Blob -->
<div class="blob-accent w-96 h-96 absolute top-20 left-10"></div>

<!-- Secondary Blob -->
<div class="blob-secondary w-80 h-80 absolute bottom-20 right-10"></div>
```

### Scrollbars

```html
<!-- Hide Scrollbar -->
<div class="scrollbar-hide overflow-auto">
  <p>Content with hidden scrollbar</p>
</div>

<!-- Custom Scrollbar -->
<div class="custom-scrollbar overflow-auto h-64">
  <p>Content with custom scrollbar</p>
</div>
```

### Custom Cursor (Optional)

```html
<!-- Add to body or main container -->
<div class="cursor-dot"></div>
<div class="cursor-ring"></div>
```

**JavaScript for custom cursor:**
```typescript
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', (e) => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  
  ring.style.left = e.clientX + 'px';
  ring.style.top = e.clientY + 'px';
});
```

### Timeline

```html
<div class="relative">
  <div class="timeline-line"></div>
  
  <div class="relative z-10">
    <div class="timeline-item">2023 - Started Project</div>
    <div class="timeline-item">2024 - Launched V1</div>
  </div>
</div>
```

### Mobile Menu

```html
<!-- Mobile Overlay -->
<div class="mobile-menu-overlay">
  <nav class="p-8">
    <a href="#" class="block text-2xl font-bold mb-4">Home</a>
    <a href="#" class="block text-2xl font-bold mb-4">About</a>
    <a href="#" class="block text-2xl font-bold mb-4">Projects</a>
  </nav>
</div>
```

## Theme Switching

### Toggle Between Light and Dark

```typescript
// Add/remove 'light' class to body or root element
const toggleTheme = () => {
  document.body.classList.toggle('light');
};
```

```html
<button (click)="toggleTheme()" class="btn-outline">
  Toggle Theme
</button>
```

## RTL Support

The design system includes RTL (Right-to-Left) support for Arabic:

```html
<!-- Enable RTL -->
<html dir="rtl">
```

Affected utilities:
- `.nav-link-hover` - Underline position
- `.progress-fill` - Transform origin
- `.timeline-line` - Position adjustment
- Font family automatically switches to Tajawal

## Responsive Design

Use Tailwind's responsive prefixes:

```html
<div class="text-2xl md:text-4xl lg:text-6xl">
  Responsive Text
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Responsive grid -->
</div>
```

## Color Usage with Tailwind

```html
<!-- Use CSS variables through Tailwind -->
<div class="bg-background text-foreground">
  <h1 class="text-primary">Title</h1>
  <p class="text-muted-foreground">Subtitle</p>
</div>

<button class="bg-accent text-accent-foreground">
  Button
</button>

<div class="border border-border rounded-lg p-4">
  Card with border
</div>
```

## Best Practices

### 1. Use Design Tokens
Always use CSS variables instead of hardcoded colors:
```html
<!-- ✅ Good -->
<div class="bg-card text-card-foreground">

<!-- ❌ Bad -->
<div class="bg-[#111111] text-[#FAFAFA]">
```

### 2. Consistent Spacing
Use Tailwind's spacing scale:
```html
<div class="p-4 md:p-6 lg:p-8">
  <h2 class="mb-4">Title</h2>
  <p class="mt-2">Content</p>
</div>
```

### 3. Combine Utilities
Leverage custom utilities with Tailwind:
```html
<div class="glass-card accent-glow rounded-xl p-6">
  <h3 class="gradient-text text-2xl font-bold">
    Combined Effects
  </h3>
</div>
```

### 4. Animation Performance
Use transform and opacity for animations:
```html
<div class="transition-all duration-300 hover:scale-105 hover:opacity-90">
  Smooth animation
</div>
```

## Common Patterns

### Hero Section
```html
<section class="relative min-h-screen flex items-center justify-center">
  <div class="blob-accent w-96 h-96 absolute top-20 left-10"></div>
  <div class="relative z-10 text-center">
    <h1 class="text-hero-xl gradient-text mb-6">
      Welcome
    </h1>
    <p class="text-xl text-muted-foreground mb-8">
      Portfolio Showcase
    </p>
    <button class="btn-primary">
      Explore Projects
    </button>
  </div>
</section>
```

### Card Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="glass-card project-card-hover rounded-xl p-6">
    <h3 class="text-xl font-bold mb-2">Project 1</h3>
    <p class="text-muted-foreground mb-4">Description</p>
    <div class="flex gap-2">
      <span class="tag-skill">React</span>
      <span class="tag-skill">TS</span>
    </div>
  </div>
</div>
```

### Contact Form
```html
<form class="glass-card-strong rounded-xl p-8 max-w-lg mx-auto">
  <h2 class="text-section-xl mb-6">Get in Touch</h2>
  
  <input type="text" class="form-input mb-4" placeholder="Name">
  <input type="email" class="form-input mb-4" placeholder="Email">
  <textarea class="form-input mb-6" rows="5" placeholder="Message"></textarea>
  
  <button type="submit" class="btn-primary w-full">
    Send Message
  </button>
</form>
```

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

For more information, see:
- [Frontend Guide](./frontend-guide.md)
- [Getting Started](./getting-started.md)
