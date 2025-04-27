# Medical Laboratory API

A comprehensive laboratory management system built with TypeScript, Express, and TypeORM. This API provides robust endpoints for managing laboratory operations, including sample handling, user authentication, role-based access control, and lab subscription management.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#Detailed-Project-Structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Testing](#testing)

## ✨ Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (RBAC)
  - Permission management
  - Email verification system

- **Laboratory Management**
  - Lab registration and profile management
  - Subscription handling for laboratory services

- **Sample Management**
  - Create and track sample records
  - Upload and manage sample media
  - Sample status tracking
  - Result notification system

- **Security**
  - Password hashing with bcrypt
  - Token-based authorization
  - Input validation

- **DevOps**
  - Error logging with Winston
  - Containerization support
  - Environment-based configuration

## 🛠️ Tech Stack

- **Core**: TypeScript, Node.js, Express.js
- **Database**: PostgreSQL, TypeORM
- **Authentication**: JWT, Bcrypt
- **Validation**: Express Validator
- **File Storage**: AWS S3
- **Notifications**: Firebase FCM
- **Logging**: Winston with daily rotation
- **Testing**: Jest

## 📂 Detailed Project Structure

```plaintext
medical-laboratory/
├── src/
│   ├── config/
│   │   ├── env.ts               # Environment configuration
│   │   ├── typeorm.ts          # Database configuration
│   │   ├── firebase.ts         # Firebase configuration
│   │   └── s3.ts              # AWS S3 configuration
│   ├── controllers/
│   │   ├── auth/
│   │   │   ├── login.ts       # User login logic
│   │   │   └── signup.ts      # User registration logic
│   │   └── samples/
│   │       ├── create.ts      # Sample creation
│   │       └── update.ts      # Sample updates
│   └── models/
│       ├── user.model.ts      # User & Profile entities
│       └── sample.model.ts    # Sample related entities
```

## 🛠️ Detailed Installation Steps

### 1. Clone & Setup

```bash
# Clone repository
git clone https://github.com/tahashabaan/medical-laboratory.git

# Navigate to project
cd medical-laboratory

# Install dependencies
npm install

# Create environment file
copy .env.example .env
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb medical_lab_db

# Run migrations
npm run typeorm migration:run

# Seed initial data
npm run seed
```

### 3. Start Development Server

```bash
# Start in development mode
npm run dev

# Or build and start in production
npm run build
npm run prod
```

## 🗃️ Database Schema Details

### User Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id UUID REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Profile Table
```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255),
    phone VARCHAR(20),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Table
```sql
CREATE TABLE samples (
    sample_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    result TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    lab_id UUID REFERENCES labs(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📚 API Endpoints Documentation

### Sample Management

#### Create Sample
```http
POST /api/v1/samples
Content-Type: application/json

{
    "userName": "string",
    "labId": "uuid",
    "description": "string"
}
```

#### Update Sample Status
```http
PATCH /api/v1/samples/:sampleId/status
Content-Type: application/json

{
    "status": "in_progress" | "completed" | "failed"
}
```

### Laboratory Management

#### Register Laboratory
```http
POST /api/v1/labs
Content-Type: application/json

{
    "name": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "address": "string"
}
```

## ⚙️ Advanced Configuration

### TypeORM Configuration
```typescript
// filepath: src/config/typeorm.ts
export const typeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['src/models/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development'
};
```

### Winston Logger Configuration
```typescript
// filepath: src/config/logger.ts
export const loggerConfig = {
    file: {
        level: 'info',
        filename: 'logs/app.log',
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 5
    },
    console: {
        level: 'debug',
        handleExceptions: true
    }
};
```

## 🔒 Security Considerations

1. **Rate Limiting**
```typescript
// filepath: src/middlewares/rateLimiter.ts
export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
```

2. **CORS Configuration**
```typescript
// filepath: src/config/cors.ts
export const corsOptions = {
    origin: process.env.FRONT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
```

## 📈 Performance Optimization

1. **Caching Strategy**
```typescript
// filepath: src/config/cache.ts
export const cacheConfig = {
    ttl: 60 * 60 * 1000, // Cache for 1 hour
    max: 1000 // Maximum number of items in cache
};
```

2. **Query Optimization**
```typescript
// filepath: src/repositories/sample.repository.ts
export const getSampleWithRelations = async (sampleId: string) => {
    return await Sample.createQueryBuilder('sample')
        .leftJoinAndSelect('sample.lab', 'lab')
        .where('sample.id = :id', { id: sampleId })
        .cache(true)
        .getOne();
};
```
