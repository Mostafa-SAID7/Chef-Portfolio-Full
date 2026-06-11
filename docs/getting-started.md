# Getting Started with FullyPorto

This guide will help you set up your development environment and get the project running locally.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** (v18 or higher)
  - Download: https://nodejs.org/
  - Verify: `node --version`

- **npm** (comes with Node.js)
  - Verify: `npm --version`

- **Angular CLI** (v20.3.3)
  - Install: `npm install -g @angular/cli@20.3.3`
  - Verify: `ng version`

- **.NET SDK** (for backend)
  - Download: https://dotnet.microsoft.com/download
  - Verify: `dotnet --version`

- **Git**
  - Download: https://git-scm.com/
  - Verify: `git --version`

### Recommended Tools

- **Visual Studio Code** - Popular code editor
- **Postman** - API testing tool
- **Chrome/Firefox DevTools** - Browser debugging

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Mostafa-SAID7/FullyPorto.git
cd FullyPorto
```

### 2. Frontend Setup

```bash
# Navigate to Angular directory
cd Angular

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:4200/`

### 3. Backend Setup

```bash
# Navigate to API directory (from root)
cd MyPortApi

# Restore NuGet packages
dotnet restore

# Run the API
dotnet run
```

The API will typically run on `https://localhost:5001/` or `http://localhost:5000/`

## Project Structure Overview

```
FullyPorto/
├── Angular/              # Frontend Application
│   ├── src/
│   │   ├── app/         # Angular components and services
│   │   ├── assets/      # Static assets
│   │   └── index.html   # Main HTML file
│   ├── package.json     # Node dependencies
│   └── angular.json     # Angular configuration
│
├── MyPortApi/           # Backend API
│   ├── Controllers/     # API controllers
│   ├── Models/          # Data models
│   └── Program.cs       # Entry point
│
├── docs/                # Documentation
└── .github/             # GitHub templates
```

## Development Workflow

### Running the Application

1. **Start the Backend API** (Terminal 1):
   ```bash
   cd MyPortApi
   dotnet run
   ```

2. **Start the Frontend** (Terminal 2):
   ```bash
   cd Angular
   npm start
   ```

3. **Open Browser**:
   - Navigate to `http://localhost:4200/`

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Test your changes:
   ```bash
   # Frontend tests
   cd Angular
   npm test

   # Backend tests
   cd MyPortApi
   dotnet test
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

## Common Commands

### Frontend (Angular)

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Generate component
ng generate component component-name
```

### Backend (.NET)

```bash
# Run application
dotnet run

# Build project
dotnet build

# Run tests
dotnet test

# Clean build artifacts
dotnet clean

# Restore packages
dotnet restore
```

## Environment Configuration

### Frontend Environment Variables

Create environment files in `Angular/src/environments/`:

- `environment.ts` - Development settings
- `environment.prod.ts` - Production settings

Example:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

### Backend Configuration

Edit `appsettings.json` and `appsettings.Development.json` for configuration.

## Troubleshooting

### Port Already in Use

If port 4200 is busy:
```bash
ng serve --port 4300
```

### Node Modules Issues

```bash
# Clear node modules and reinstall
cd Angular
rm -rf node_modules package-lock.json
npm install
```

### .NET Build Errors

```bash
# Clean and restore
dotnet clean
dotnet restore
dotnet build
```

## Next Steps

- Read the [Architecture Guide](./architecture.md)
- Check out the [Frontend Guide](./frontend-guide.md)
- Review the [Backend Guide](./backend-guide.md)
- Explore the [API Reference](./api-reference.md)

## Getting Help

- Check the [Troubleshooting Guide](./troubleshooting.md)
- Review [Contributing Guidelines](../CONTRIBUTING.md)
- Open an [issue](../../issues) if you need help

---

Happy coding! 🚀
