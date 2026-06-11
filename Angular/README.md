# FullyPorto Frontend

Modern portfolio application built with Angular 20, Tailwind CSS, and SSR support.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 10+

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Navigate to `http://localhost:4200/`

### Build

```bash
# Production build
npm run build

# Development build
npm run build:dev
```

## 📦 Tech Stack

- **Framework:** Angular 20.3.0
- **Styling:** Tailwind CSS with custom design system
- **SSR:** Angular Universal
- **Fonts:** Plus Jakarta Sans, Tajawal (Arabic)
- **Icons:** (Add your icon library)

## 🎨 Design System

Complete custom styling system with:
- Glass morphism effects
- Golden accent theme (#E8C547)
- Dark/Light mode support
- RTL support for Arabic
- Custom animations and transitions
- Responsive typography

See [Styling Guide](../docs/styling-guide.md) for details.

## 📁 Project Structure

```
src/
├── app/               # Application components
├── assets/            # Static assets
├── environments/      # Environment configs
├── styles.css         # Global styles + Tailwind
└── index.html         # Main HTML file
```

## 🌐 Deployment

### Netlify (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist/ClientApp/browser
```

See [Netlify Deployment Guide](../docs/netlify-deployment.md) for detailed instructions.

### Other Platforms

- **Vercel:** `vercel deploy`
- **Azure:** Use Azure Static Web Apps
- **GitHub Pages:** Configure with `angular-cli-ghpages`

## 🛠️ Available Scripts

- `npm start` - Development server (port 4200)
- `npm run build` - Production build
- `npm run build:dev` - Development build
- `npm test` - Run unit tests
- `npm run watch` - Build with watch mode
- `npm run preview` - Preview production build

## 🔧 Configuration Files

- `angular.json` - Angular CLI configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `netlify.toml` - Netlify deployment settings
- `tsconfig.json` - TypeScript configuration

## 🎯 Features

- ✅ Server-Side Rendering (SSR)
- ✅ Responsive design
- ✅ Dark/Light theme
- ✅ RTL support
- ✅ SEO optimized
- ✅ PWA ready
- ✅ Performance optimized
- ✅ Accessibility compliant

## 📚 Documentation

- [Getting Started](../docs/getting-started.md)
- [Architecture](../docs/architecture.md)
- [Frontend Guide](../docs/frontend-guide.md)
- [Styling Guide](../docs/styling-guide.md)
- [Deployment Guide](../docs/netlify-deployment.md)

## 🤝 Contributing

See [Contributing Guidelines](../CONTRIBUTING.md)

## 📄 License

MIT License - see [LICENSE](../LICENSE)

---

Built with ❤️ using Angular and Tailwind CSS
