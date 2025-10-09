# Spice Hut Authentication System

## Overview
This authentication system provides secure user and admin registration, login, and profile management for the Spice Hut restaurant application.

## Features
- ✅ User registration with customer profile creation
- ✅ Admin registration with role-based permissions
- ✅ Secure password hashing with bcrypt (12 salt rounds)
- ✅ JWT token-based authentication
- ✅ Role-based access control
- ✅ Input validation and error handling
- ✅ Profile management
- ✅ Last login tracking

## API Endpoints

### Public Endpoints

#### 1. User Signup
```http
POST /api/auth/signup/user
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1 (555) 123-4567"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+1 (555) 123-4567",
      "role": "user",
      "isActive": true
    },
    "token": "jwt_token_here"
  }
}
```

#### 2. Admin Signup
```http
POST /api/auth/signup/admin
Content-Type: application/json

{
  "username": "adminuser",
  "email": "admin@spicehut.com",
  "password": "password123",
  "firstName": "Admin",
  "lastName": "User",
  "phone": "+1 (555) 987-6543",
  "adminRole": "Manager",
  "department": "Kitchen"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin registered successfully",
  "data": {
    "user": {
      "id": "admin_id",
      "username": "adminuser",
      "email": "admin@spicehut.com",
      "firstName": "Admin",
      "lastName": "User",
      "phone": "+1 (555) 987-6543",
      "role": "admin",
      "isActive": true,
      "adminProfile": {
        "adminRole": "Manager",
        "department": "Kitchen",
        "permissions": {
          "menuManagement": true,
          "orderManagement": true,
          "customerManagement": true,
          "adminManagement": false,
          "reports": true,
          "contentManagement": true
        }
      }
    },
    "token": "jwt_token_here"
  }
}
```

#### 3. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+1 (555) 123-4567",
      "role": "user",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "loyaltyPoints": 0,
      "totalOrders": 0,
      "totalSpent": 0,
      "addresses": []
    },
    "token": "jwt_token_here"
  }
}
```

### Protected Endpoints

#### 4. Get Profile
```http
GET /api/auth/profile
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+1 (555) 123-4567",
      "role": "user",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "loyaltyPoints": 150,
      "totalOrders": 5,
      "totalSpent": 125.50,
      "addresses": [...],
      "preferences": {...}
    }
  }
}
```

#### 5. Logout
```http
POST /api/auth/logout
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## Security Features

### Password Security
- Passwords are hashed using bcrypt with 12 salt rounds
- Minimum password length: 6 characters
- Passwords are never returned in API responses

### JWT Tokens
- Tokens expire after 7 days
- Include user ID and role information
- Required for all protected endpoints

### Input Validation
- Email format validation
- Required field validation
- Username uniqueness check
- Email uniqueness check

### Role-Based Access
- **User Role**: Access to customer features
- **Admin Role**: Access to admin panel with configurable permissions

## Admin Permissions

| Permission | Super Admin | Manager | Staff |
|------------|-------------|---------|-------|
| Menu Management | ✅ | ✅ | ❌ |
| Order Management | ✅ | ✅ | ✅ |
| Customer Management | ✅ | ✅ | ❌ |
| Admin Management | ✅ | ❌ | ❌ |
| Reports | ✅ | ✅ | ❌ |
| Content Management | ✅ | ✅ | ❌ |

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created (signup)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (insufficient permissions)
- `500` - Internal Server Error

## Testing

Run the authentication tests:
```bash
npm run test:auth
```

This will test all authentication endpoints with sample data.

## Environment Variables

Required environment variables:
```env
MONGO_URI=mongodb://localhost:27017/spice-hut
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure
NODE_ENV=development
```

## Usage in Frontend

### Storing Token
```javascript
// After successful login
localStorage.setItem('token', response.data.token);
```

### Making Authenticated Requests
```javascript
const token = localStorage.getItem('token');
const response = await fetch('/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### Checking User Role
```javascript
const user = response.data.user;
if (user.role === 'admin') {
  // Show admin features
} else {
  // Show user features
}
```

## Database Models

The authentication system uses these models:
- **User**: Core authentication data
- **Customer**: Extended user profile for customers
- **Admin**: Extended user profile for admins

All models include timestamps and proper indexing for performance.
