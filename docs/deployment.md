# Deployment Guide

This guide covers deploying the FullyPorto application to various platforms.

## Prerequisites

- Built and tested application
- Production environment configured
- Domain name (optional but recommended)
- SSL certificate

## Frontend Deployment (Angular)

### Build for Production

```bash
cd Angular
npm run build
```

This creates optimized files in `dist/` directory.

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
cd Angular
npm run build
netlify deploy --prod --dir=dist/ClientApp/browser
```

3. Configure `netlify.toml`:
```toml
[build]
  publish = "dist/ClientApp/browser"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd Angular
vercel --prod
```

3. Configure `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/ClientApp/browser",
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Deploy to Azure Static Web Apps

1. Create Azure Static Web App
2. Connect to your GitHub repository
3. Configure build:
```yaml
app_location: "/Angular"
api_location: ""
output_location: "dist/ClientApp/browser"
```

## Backend Deployment (.NET API)

### Build for Production

```bash
cd MyPortApi
dotnet publish -c Release -o ./publish
```

### Deploy to Azure App Service

1. **Using Azure CLI:**
```bash
# Login
az login

# Create resource group
az group create --name PortfolioRG --location eastus

# Create app service plan
az appservice plan create --name PortfolioPlan \
  --resource-group PortfolioRG --sku B1

# Create web app
az webapp create --name portfolio-api \
  --resource-group PortfolioRG --plan PortfolioPlan

# Deploy
az webapp deployment source config-zip \
  --resource-group PortfolioRG \
  --name portfolio-api \
  --src ./publish.zip
```

2. **Using Visual Studio:**
   - Right-click project → Publish
   - Select Azure → Azure App Service
   - Follow the wizard

### Deploy to AWS Elastic Beanstalk

1. Install AWS CLI and EB CLI
2. Initialize:
```bash
eb init -p "64bit Amazon Linux 2 v2.0.0 running .NET Core" portfolio-api
```

3. Create environment:
```bash
eb create portfolio-env
```

4. Deploy:
```bash
dotnet publish -c Release
eb deploy
```

### Deploy to Docker

1. Create `Dockerfile`:
```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MyPortApi.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "MyPortApi.dll"]
```

2. Build image:
```bash
docker build -t portfolio-api .
```

3. Run container:
```bash
docker run -d -p 5000:80 portfolio-api
```

## Environment Configuration

### Frontend Environment Variables

Create `.env.production`:
```bash
API_URL=https://api.yourdomain.com
```

Update `environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api'
};
```

### Backend Configuration

Update `appsettings.Production.json`:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Cors": {
    "AllowedOrigins": [
      "https://yourdomain.com"
    ]
  }
}
```

## SSL/TLS Configuration

### Using Let's Encrypt (Linux)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Using Azure/AWS

- Azure: Automatically provides SSL for App Services
- AWS: Use AWS Certificate Manager

## Database Migration

### Backup Production Database

```bash
# SQL Server
sqlcmd -S server -U user -P pass -Q "BACKUP DATABASE..."

# PostgreSQL
pg_dump dbname > backup.sql
```

### Apply Migrations

```bash
dotnet ef database update --connection "ProductionConnectionString"
```

## Monitoring and Logging

### Application Insights (Azure)

Add to `appsettings.Production.json`:
```json
{
  "ApplicationInsights": {
    "InstrumentationKey": "your-key"
  }
}
```

### Logging Configuration

```csharp
// Program.cs
builder.Logging.AddConsole();
builder.Logging.AddDebug();
builder.Logging.AddApplicationInsights();
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd Angular
          npm ci
      
      - name: Build
        run: |
          cd Angular
          npm run build
      
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=Angular/dist/ClientApp/browser
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup .NET
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: '8.0.x'
      
      - name: Build and publish
        run: |
          cd MyPortApi
          dotnet publish -c Release -o ./publish
      
      - name: Deploy to Azure
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'portfolio-api'
          publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
          package: ./MyPortApi/publish
```

## Performance Optimization

### Frontend Optimization
- Enable production mode
- Use AOT compilation
- Enable lazy loading
- Minimize bundle size
- Use CDN for static assets
- Enable gzip compression

### Backend Optimization
- Enable response caching
- Use async/await
- Optimize database queries
- Enable compression middleware
- Use connection pooling

## Security Checklist

- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] API keys secured
- [ ] Database connection strings encrypted
- [ ] Input validation implemented
- [ ] Rate limiting configured
- [ ] Security headers set
- [ ] Dependencies updated

## Post-Deployment

1. **Verify Deployment:**
   - Check application is accessible
   - Test all endpoints
   - Verify database connection
   - Check logs for errors

2. **Monitor Performance:**
   - Set up monitoring alerts
   - Track response times
   - Monitor error rates
   - Check resource usage

3. **Backup Strategy:**
   - Schedule regular backups
   - Test restore procedures
   - Document recovery process

## Rollback Procedure

If deployment fails:

1. **Frontend:**
```bash
# Revert to previous version
netlify rollback
```

2. **Backend:**
```bash
# Deploy previous version
az webapp deployment source config-zip --src previous-version.zip
```

## Resources

- [Azure Documentation](https://docs.microsoft.com/azure/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Netlify Documentation](https://docs.netlify.com/)
- [Docker Documentation](https://docs.docker.com/)

---

For issues, see: [Troubleshooting Guide](./troubleshooting.md)
