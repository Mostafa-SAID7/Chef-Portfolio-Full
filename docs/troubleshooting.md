# Troubleshooting Guide

Common issues and their solutions for FullyPorto.

## Frontend Issues

### Issue: Port 4200 Already in Use

**Error:**
```
Port 4200 is already in use. Use '--port' to specify a different port.
```

**Solution:**
```bash
# Option 1: Use different port
ng serve --port 4300

# Option 2: Kill process using port 4200 (Windows)
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# Option 2: Kill process (Linux/Mac)
lsof -ti:4200 | xargs kill -9
```

### Issue: Module Not Found

**Error:**
```
Module not found: Error: Can't resolve 'module-name'
```

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or clear npm cache
npm cache clean --force
npm install
```

### Issue: Angular CLI Version Mismatch

**Error:**
```
Your global Angular CLI version is greater than your local version
```

**Solution:**
```bash
# Update local CLI
npm install @angular/cli@latest

# Or match global version
npm install @angular/cli@20.3.3
```

### Issue: SSR Build Fails

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
cd Angular
npm install express @types/express
```

### Issue: CORS Errors

**Error:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
1. Check backend CORS configuration
2. Ensure allowed origins include frontend URL
3. Backend code:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});
```

### Issue: Build Memory Issues

**Error:**
```
JavaScript heap out of memory
```

**Solution:**
```bash
# Increase Node memory
set NODE_OPTIONS=--max-old-space-size=4096
npm run build

# Or in package.json
"scripts": {
  "build": "node --max-old-space-size=4096 node_modules/@angular/cli/bin/ng build"
}
```

## Backend Issues

### Issue: Port Already in Use

**Error:**
```
Unable to bind to https://localhost:5001 address already in use
```

**Solution:**
```bash
# Change port in launchSettings.json
# Or find and kill process (Windows)
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

### Issue: Database Connection Failed

**Error:**
```
A network-related error occurred while establishing a connection to SQL Server
```

**Solution:**
1. Check connection string in `appsettings.json`
2. Verify database server is running
3. Check firewall settings
4. Test connection:
```bash
sqlcmd -S server -U user -P password
```

### Issue: Missing Dependencies

**Error:**
```
Could not load file or assembly
```

**Solution:**
```bash
# Restore NuGet packages
dotnet restore

# Clean and rebuild
dotnet clean
dotnet build
```

### Issue: Migration Failed

**Error:**
```
Unable to create migration
```

**Solution:**
```bash
# Install EF Core tools
dotnet tool install --global dotnet-ef

# Update tools
dotnet tool update --global dotnet-ef

# Create migration
dotnet ef migrations add InitialCreate

# Apply migration
dotnet ef database update
```

### Issue: SSL Certificate Error

**Error:**
```
The SSL connection could not be established
```

**Solution:**
```bash
# Trust development certificate
dotnet dev-certs https --trust

# Or disable HTTPS in development
# In launchSettings.json, use http instead of https
```

## npm/Node Issues

### Issue: npm Install Fails

**Error:**
```
npm ERR! code EACCES
```

**Solution:**
```bash
# Fix permissions (Linux/Mac)
sudo chown -R $(whoami) ~/.npm

# Or use different npm registry
npm config set registry https://registry.npmjs.org/

# Clear cache
npm cache clean --force
```

### Issue: Package Lock Conflicts

**Error:**
```
npm ERR! peer dependency conflicts
```

**Solution:**
```bash
# Use legacy peer deps
npm install --legacy-peer-deps

# Or force install
npm install --force

# Better: Update package.json and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Git Issues

### Issue: Merge Conflicts

**Solution:**
```bash
# View conflicts
git status

# Resolve conflicts in files
# Then add and commit
git add .
git commit -m "Resolve merge conflicts"

# Or abort merge
git merge --abort
```

### Issue: Large File Warnings

**Error:**
```
warning: large files detected
```

**Solution:**
```bash
# Add to .gitignore
echo "large-file.zip" >> .gitignore

# Remove from tracking
git rm --cached large-file.zip
git commit -m "Remove large file"
```

## Performance Issues

### Issue: Slow Build Times

**Solution:**
1. Use incremental builds:
```bash
ng build --watch
```

2. Reduce bundle size:
   - Enable lazy loading
   - Remove unused dependencies
   - Optimize imports

3. Increase Node memory (see above)

### Issue: Slow API Response

**Solution:**
1. Enable caching
2. Optimize database queries
3. Add indexes to database
4. Use async operations
5. Enable response compression

## Testing Issues

### Issue: Tests Fail to Run

**Error:**
```
Karma - ERROR: No binary for Chrome browser on your platform
```

**Solution:**
```bash
# Install Chrome/Chromium
# Or use headless Chrome in karma.conf.js
browsers: ['ChromeHeadless']
```

### Issue: Test Timeouts

**Solution:**
```typescript
// Increase timeout in test
it('should work', async () => {
  // test code
}, 10000); // 10 second timeout
```

## Deployment Issues

### Issue: Build Fails in Production

**Solution:**
1. Test production build locally:
```bash
ng build --configuration production
```

2. Check environment variables
3. Review build logs
4. Verify all dependencies are in `package.json` (not devDependencies)

### Issue: API Not Accessible After Deployment

**Solution:**
1. Check firewall rules
2. Verify port configuration
3. Check CORS settings
4. Review deployment logs
5. Verify environment variables

## Getting More Help

If your issue isn't listed here:

1. **Check Logs:**
   - Browser console for frontend
   - Server logs for backend

2. **Search Issues:**
   - [GitHub Issues](../../issues)
   - Stack Overflow

3. **Create New Issue:**
   - Use bug report template
   - Include error messages
   - Provide steps to reproduce
   - Specify environment details

4. **Community Resources:**
   - [Angular Community](https://angular.io/resources)
   - [.NET Community](https://dotnet.microsoft.com/platform/community)

---

Last updated: June 2026
