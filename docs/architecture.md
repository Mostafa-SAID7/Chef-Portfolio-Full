# Architecture Guide

## Overview

FullyPorto is a full-stack portfolio application following a client-server architecture with clear separation of concerns.

## Technology Stack

### Frontend
- **Framework:** Angular 20.3.0
- **Language:** TypeScript 5.9.2
- **Rendering:** Server-Side Rendering (SSR) with Angular Universal
- **HTTP Client:** Angular HttpClient
- **Routing:** Angular Router
- **State Management:** RxJS
- **Styling:** CSS

### Backend
- **Framework:** .NET Core
- **Language:** C#
- **API Style:** RESTful
- **Server:** Kestrel

## Architecture Layers

### Frontend Architecture

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│   (Components, Templates, Styles)   │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│         Service Layer               │
│   (Business Logic, HTTP Services)   │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│         Data Layer                  │
│   (Models, Interfaces)              │
└─────────────────────────────────────┘
```

### Backend Architecture

```
┌─────────────────────────────────────┐
│         API Layer                   │
│   (Controllers, Routes)             │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│         Business Logic Layer        │
│   (Services, Validators)            │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│         Data Access Layer           │
│   (Repositories, DbContext)         │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│         Database                    │
└─────────────────────────────────────┘
```

## Communication Flow

1. User interacts with the Angular frontend
2. Component calls a service method
3. Service makes HTTP request to the API
4. API controller receives the request
5. Controller calls business logic service
6. Service performs operations and returns data
7. Controller returns HTTP response
8. Frontend service receives response
9. Component updates the UI

## Key Design Patterns

### Frontend Patterns

- **Component-Based Architecture:** Modular, reusable UI components
- **Dependency Injection:** Services injected into components
- **Observable Pattern:** RxJS for async operations
- **Lazy Loading:** Route-based code splitting

### Backend Patterns

- **Repository Pattern:** Abstract data access
- **Dependency Injection:** Loose coupling between layers
- **RESTful API:** Standard HTTP methods and status codes
- **Middleware Pipeline:** Request/response processing

## Security Considerations

- CORS configuration for frontend-backend communication
- Input validation and sanitization
- HTTPS enforcement in production
- Environment-based configuration

## Performance Optimizations

### Frontend
- Server-Side Rendering (SSR) for faster initial load
- Lazy loading of routes
- AOT (Ahead-of-Time) compilation
- Tree shaking and minification

### Backend
- Efficient database queries
- Response caching where applicable
- Async/await for I/O operations

## Scalability Considerations

- Stateless API design
- Horizontal scaling capability
- Separation of frontend and backend
- CDN for static assets

## Folder Structure

### Angular Frontend

```
Angular/
├── src/
│   ├── app/
│   │   ├── components/        # Reusable components
│   │   ├── services/          # Business logic services
│   │   ├── models/            # TypeScript interfaces
│   │   ├── guards/            # Route guards
│   │   └── interceptors/      # HTTP interceptors
│   ├── assets/                # Static files
│   ├── environments/          # Environment configs
│   └── styles.css             # Global styles
└── angular.json               # Angular configuration
```

### .NET Backend

```
MyPortApi/
├── Controllers/               # API endpoints
├── Services/                  # Business logic
├── Models/                    # Data models
├── DTOs/                      # Data transfer objects
├── Repositories/              # Data access
├── Middleware/                # Custom middleware
├── Extensions/                # Extension methods
└── Program.cs                 # Application entry point
```

## Data Flow Example

### Fetching Portfolio Items

1. User navigates to portfolio page
2. Angular component calls `PortfolioService.getItems()`
3. Service makes GET request to `/api/portfolio`
4. API controller receives request
5. Controller calls `PortfolioService.GetAll()`
6. Service queries database
7. Data mapped to DTOs
8. JSON response returned
9. Frontend displays items

## Future Enhancements

- Add authentication and authorization
- Implement caching strategy
- Add real-time features with SignalR
- Integrate state management library (NgRx)
- Add GraphQL layer
- Implement microservices architecture

---

For more details, see:
- [Frontend Guide](./frontend-guide.md)
- [Backend Guide](./backend-guide.md)
- [API Reference](./api-reference.md)
