# 🚀 NestJS Backend - Professional Structure

Professional NestJS backend API with MongoDB, JWT authentication, and scalable architecture.

## 📁 Folder Structure

```
backend/
├── src/
│   ├── modules/                    # Feature modules
│   │   ├── auth/                   # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── strategies/
│   │   │   │   └── jwt.strategy.ts
│   │   │   └── guards/
│   │   │       └── jwt.guard.ts
│   │   └── users/                  # Users module
│   │       ├── users.controller.ts
│   │       ├── users.service.ts
│   │       └── users.module.ts
│   │
│   ├── common/                     # Shared utilities
│   │   ├── guards/
│   │   │   └── jwt.guard.ts
│   │   ├── filters/
│   │   ├── interceptors/
│   │   ├── decorators/
│   │   ├── middleware/
│   │   └── index.ts
│   │
│   ├── schemas/                    # Mongoose schemas
│   │   └── user.schema.ts
│   │
│   ├── dto/                        # Data Transfer Objects
│   │   └── login.dto.ts
│   │
│   ├── interfaces/                 # TypeScript interfaces
│   │
│   ├── config/                     # Configuration
│   │   └── configuration.ts
│   │
│   ├── app.module.ts              # Root module
│   ├── main.ts                    # Entry point
│   └── seed.ts                    # Database seeding
│
├── test/                          # Tests
├── dist/                          # Built files
├── .env                          # Environment variables
├── .env.example                  # Example env file
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Environment Setup
```bash
# Copy example env file
cp .env.example .env

# Update values in .env
MONGO_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=1h
NODE_ENV=development
PORT=3001
```

### Database Seeding
```bash
# Create superadmin user
npm run seed
```

### Start Development Server
```bash
npm run start:dev
```

Server will run on `http://localhost:3001`

## 📚 API Endpoints

### Authentication
- **POST** `/auth/login` - Login with credentials
  ```json
  {
    "username": "superadmin",
    "password": "admin123456"
  }
  ```
  Response: JWT token

- **GET** `/auth/profile` - Get current user (protected)
  - Header: `Authorization: Bearer <token>`

## 🔐 Default Credentials

After running `npm run seed`:
- **Username:** `superadmin`
- **Password:** `admin123456`

⚠️ **Change in production!**

## 📦 Available Scripts

```bash
npm run build       # Build for production
npm run start       # Start production server
npm run start:dev   # Start with hot reload
npm run start:debug # Debug mode
npm run lint        # Run ESLint
npm run test        # Run tests
npm run seed        # Seed database
```

## 🔧 Tech Stack

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT + Passport
- **Validation:** class-validator
- **Config:** @nestjs/config

## 🎯 Architecture

- ✅ **Modular Design** - Feature-based organization
- ✅ **Separation of Concerns** - Clear responsibility boundaries
- ✅ **Scalable** - Easy to add new modules
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Environment-Based** - Configuration via .env
- ✅ **RESTful** - Standard API patterns

## 🛡️ Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Environment variables for secrets
- ✅ Input validation with decorators
- ✅ MongoDB connection pooling
- ✅ Error handling and logging

## 📖 Documentation

- [NestJS Docs](https://docs.nestjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT Guide](https://tools.ietf.org/html/rfc8174)
- [Mongoose Guide](https://mongoosejs.com)

## 🤝 Contributing

1. Create feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

UNLICENSED
