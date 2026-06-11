# API Reference

Complete API endpoint documentation for FullyPorto.

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Authentication

Currently, the API does not require authentication. This will be added in future versions.

## Endpoints

### Portfolio

#### Get All Portfolio Items

```http
GET /api/portfolio
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Project Title",
    "description": "Project description",
    "createdAt": "2026-01-01T00:00:00Z"
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

#### Get Portfolio Item by ID

```http
GET /api/portfolio/{id}
```

**Parameters:**
- `id` (integer, required) - Portfolio item ID

**Response:**
```json
{
  "id": 1,
  "title": "Project Title",
  "description": "Project description",
  "createdAt": "2026-01-01T00:00:00Z"
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Item not found
- `500 Internal Server Error` - Server error

---

#### Create Portfolio Item

```http
POST /api/portfolio
```

**Request Body:**
```json
{
  "title": "New Project",
  "description": "Project description"
}
```

**Response:**
```json
{
  "id": 2,
  "title": "New Project",
  "description": "Project description",
  "createdAt": "2026-06-11T00:00:00Z"
}
```

**Status Codes:**
- `201 Created` - Item created successfully
- `400 Bad Request` - Invalid input
- `500 Internal Server Error` - Server error

---

#### Update Portfolio Item

```http
PUT /api/portfolio/{id}
```

**Parameters:**
- `id` (integer, required) - Portfolio item ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated Title",
  "description": "Updated description",
  "updatedAt": "2026-06-11T00:00:00Z"
}
```

**Status Codes:**
- `200 OK` - Item updated successfully
- `400 Bad Request` - Invalid input
- `404 Not Found` - Item not found
- `500 Internal Server Error` - Server error

---

#### Delete Portfolio Item

```http
DELETE /api/portfolio/{id}
```

**Parameters:**
- `id` (integer, required) - Portfolio item ID

**Response:**
```json
{
  "message": "Item deleted successfully"
}
```

**Status Codes:**
- `200 OK` - Item deleted successfully
- `404 Not Found` - Item not found
- `500 Internal Server Error` - Server error

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "timestamp": "2026-06-11T00:00:00Z"
}
```

## Rate Limiting

Currently, no rate limiting is implemented. This will be added in future versions.

## Versioning

API version is included in the URL path. Current version: v1

Future versions will use: `/api/v2/endpoint`

## Data Models

### Portfolio Item

```typescript
{
  id: number;              // Unique identifier
  title: string;           // Item title (max 100 chars)
  description: string;     // Item description
  imageUrl?: string;       // Optional image URL
  projectUrl?: string;     // Optional project URL
  technologies?: string[]; // Technologies used
  createdAt: Date;        // Creation timestamp
  updatedAt?: Date;       // Last update timestamp
}
```

### Create Portfolio DTO

```typescript
{
  title: string;           // Required, max 100 chars
  description: string;     // Required
  imageUrl?: string;       // Optional
  projectUrl?: string;     // Optional
  technologies?: string[]; // Optional
}
```

## Testing the API

### Using cURL

```bash
# Get all items
curl http://localhost:5000/api/portfolio

# Get item by ID
curl http://localhost:5000/api/portfolio/1

# Create new item
curl -X POST http://localhost:5000/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test description"}'

# Update item
curl -X PUT http://localhost:5000/api/portfolio/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","description":"Updated description"}'

# Delete item
curl -X DELETE http://localhost:5000/api/portfolio/1
```

### Using Postman

1. Import the API collection (coming soon)
2. Set base URL to `http://localhost:5000/api`
3. Test each endpoint

## CORS Configuration

The API allows requests from:
- `http://localhost:4200` (Development)
- Production domain (to be configured)

---

For more information, see:
- [Backend Guide](./backend-guide.md)
- [Frontend Guide](./frontend-guide.md)
