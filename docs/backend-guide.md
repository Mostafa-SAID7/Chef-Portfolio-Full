# Backend Development Guide

This guide covers .NET Core API development practices for the FullyPorto project.

## Project Structure

```
MyPortApi/
├── Controllers/           # API controllers
├── Services/             # Business logic
├── Models/               # Domain models
├── DTOs/                 # Data transfer objects
├── Repositories/         # Data access layer
├── Middleware/           # Custom middleware
├── Extensions/           # Extension methods
├── appsettings.json      # Configuration
└── Program.cs            # Entry point
```

## Controller Development

### Basic Controller

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PortfolioController : ControllerBase
{
    private readonly IPortfolioService _service;
    
    public PortfolioController(IPortfolioService service)
    {
        _service = service;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _service.GetAllAsync();
        return Ok(items);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);
        if (item == null)
            return NotFound();
        return Ok(item);
    }
    
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
            
        var result = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), 
            new { id = result.Id }, result);
    }
}
```

## Service Layer

```csharp
public interface IPortfolioService
{
    Task<IEnumerable<PortfolioDto>> GetAllAsync();
    Task<PortfolioDto> GetByIdAsync(int id);
    Task<PortfolioDto> CreateAsync(CreateDto dto);
}

public class PortfolioService : IPortfolioService
{
    private readonly IRepository<Portfolio> _repository;
    
    public PortfolioService(IRepository<Portfolio> repository)
    {
        _repository = repository;
    }
    
    public async Task<IEnumerable<PortfolioDto>> GetAllAsync()
    {
        var items = await _repository.GetAllAsync();
        return items.Select(MapToDto);
    }
    
    private PortfolioDto MapToDto(Portfolio entity)
    {
        return new PortfolioDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description
        };
    }
}
```

## Data Models

### Entity Model
```csharp
public class Portfolio
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
```

### DTO (Data Transfer Object)
```csharp
public class PortfolioDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
}

public class CreateDto
{
    [Required]
    [StringLength(100)]
    public string Title { get; set; }
    
    [Required]
    public string Description { get; set; }
}
```

## Dependency Injection

Configure services in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddScoped<IPortfolioService, PortfolioService>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Configure middleware
app.UseCors("AllowAngular");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

## Error Handling

### Global Exception Handler

```csharp
public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlerMiddleware> _logger;
    
    public ErrorHandlerMiddleware(RequestDelegate next, 
        ILogger<ErrorHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred");
            await HandleExceptionAsync(context, ex);
        }
    }
    
    private static Task HandleExceptionAsync(HttpContext context, 
        Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = 500;
        
        return context.Response.WriteAsJsonAsync(new
        {
            error = "An error occurred",
            message = exception.Message
        });
    }
}
```

## Configuration

### appsettings.json
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=PortfolioDB;..."
  }
}
```

### Reading Configuration
```csharp
public class MyService
{
    private readonly IConfiguration _config;
    
    public MyService(IConfiguration config)
    {
        _config = config;
    }
    
    public string GetConnectionString()
    {
        return _config.GetConnectionString("DefaultConnection");
    }
}
```

## Testing

### Unit Test Example
```csharp
using Xunit;
using Moq;

public class PortfolioServiceTests
{
    [Fact]
    public async Task GetAllAsync_ReturnsAllItems()
    {
        // Arrange
        var mockRepo = new Mock<IRepository<Portfolio>>();
        mockRepo.Setup(r => r.GetAllAsync())
            .ReturnsAsync(GetTestData());
        var service = new PortfolioService(mockRepo.Object);
        
        // Act
        var result = await service.GetAllAsync();
        
        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
    }
    
    private List<Portfolio> GetTestData()
    {
        return new List<Portfolio>
        {
            new Portfolio { Id = 1, Title = "Test 1" },
            new Portfolio { Id = 2, Title = "Test 2" }
        };
    }
}
```

## API Best Practices

1. **Use Appropriate HTTP Methods:**
   - GET for retrieval
   - POST for creation
   - PUT for full update
   - PATCH for partial update
   - DELETE for removal

2. **Return Proper Status Codes:**
   - 200 OK - Success
   - 201 Created - Resource created
   - 400 Bad Request - Invalid input
   - 401 Unauthorized - Authentication required
   - 404 Not Found - Resource not found
   - 500 Internal Server Error - Server error

3. **Validate Input:**
```csharp
[HttpPost]
public IActionResult Create([FromBody] CreateDto dto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);
    // Process...
}
```

4. **Use Async/Await:**
```csharp
public async Task<IActionResult> GetAsync()
{
    var data = await _service.GetDataAsync();
    return Ok(data);
}
```

5. **Implement Pagination:**
```csharp
[HttpGet]
public async Task<IActionResult> GetPaged(
    [FromQuery] int page = 1, 
    [FromQuery] int pageSize = 10)
{
    var items = await _service.GetPagedAsync(page, pageSize);
    return Ok(items);
}
```

## Useful Commands

```bash
# Run application
dotnet run

# Build
dotnet build

# Test
dotnet test

# Add package
dotnet add package PackageName

# Create migration (if using EF Core)
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update
```

## Resources

- [.NET Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)

---

Next: [API Reference](./api-reference.md)
