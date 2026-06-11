# Frontend Development Guide

This guide covers Angular development practices for the FullyPorto project.

## Angular Project Structure

```
Angular/
├── src/
│   ├── app/
│   │   ├── app.ts                 # Root component
│   │   ├── app.html               # Root template
│   │   ├── app.css                # Root styles
│   │   ├── app.routes.ts          # Route definitions
│   │   └── app.config.ts          # App configuration
│   ├── index.html                 # Main HTML file
│   ├── main.ts                    # Application entry point
│   └── styles.css                 # Global styles
└── angular.json                   # Angular CLI config
```

## Development Guidelines

### Component Creation

Generate a new component:
```bash
ng generate component components/component-name
```

Example component structure:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  title = 'Example Component';
  
  constructor() {}
  
  ngOnInit(): void {
    // Initialization logic
  }
}
```

### Service Creation

Generate a new service:
```bash
ng generate service services/service-name
```

Example service:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }
}
```

### Routing

Define routes in `app.routes.ts`:
```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { 
    path: 'portfolio', 
    loadComponent: () => import('./components/portfolio/portfolio.component')
      .then(m => m.PortfolioComponent)
  }
];
```

### State Management with RxJS

```typescript
import { BehaviorSubject, Observable } from 'rxjs';

export class StateService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this.dataSubject.asObservable();

  updateData(data: any): void {
    this.dataSubject.next(data);
  }
}
```

### HTTP Interceptors

Create an interceptor for common HTTP operations:
```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  
  return next(req);
};
```

## Styling Guidelines

### Component Styles
- Use component-scoped CSS
- Follow BEM naming convention
- Keep styles modular and reusable

### Global Styles
- Define in `styles.css`
- Use CSS custom properties for theming
- Maintain consistent spacing and colors

## Testing

### Unit Tests

```typescript
import { TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ExampleComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
```

Run tests:
```bash
npm test
```

## Performance Best Practices

1. **Use OnPush Change Detection:**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

2. **Lazy Load Routes:**
```typescript
{
  path: 'feature',
  loadChildren: () => import('./feature/feature.routes')
}
```

3. **Unsubscribe from Observables:**
```typescript
private destroy$ = new Subject<void>();

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

4. **Use TrackBy with ngFor:**
```typescript
trackByFn(index: number, item: any): any {
  return item.id;
}
```

## Common Patterns

### Error Handling
```typescript
this.service.getData()
  .pipe(
    catchError(error => {
      console.error('Error:', error);
      return of([]);
    })
  )
  .subscribe(data => {
    this.data = data;
  });
```

### Loading States
```typescript
export class ComponentWithLoading {
  loading = false;
  
  loadData(): void {
    this.loading = true;
    this.service.getData()
      .pipe(finalize(() => this.loading = false))
      .subscribe(data => this.data = data);
  }
}
```

## Environment Configuration

### Development
```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

### Production
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com'
};
```

## Build and Deployment

### Development Build
```bash
npm run build
```

### Production Build
```bash
ng build --configuration production
```

### SSR Build
```bash
npm run build:ssr
npm run serve:ssr
```

## Useful Commands

```bash
# Generate component
ng g c components/name

# Generate service
ng g s services/name

# Generate guard
ng g g guards/name

# Generate pipe
ng g p pipes/name

# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

## Resources

- [Angular Documentation](https://angular.io/docs)
- [RxJS Documentation](https://rxjs.dev/)
- [Angular CLI](https://angular.io/cli)

---

Next: [Backend Guide](./backend-guide.md)
