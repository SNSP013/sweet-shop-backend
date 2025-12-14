# 🍬 Sweet Shop Backend

Backend API for the **Sweet Shop Management System**, built using **NestJS**, **Prisma**, **PostgreSQL**, **JWT Authentication**, and **Redis Caching**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Login & Register with JWT  
- Role-based access control (USER / ADMIN)

### 🍭 Sweet Management
- Create / Update / Delete sweets  
- Search sweets (name, price range, category)  
- Pagination + Sorting  
- Redis caching for better performance  

### 📦 Inventory System
- Purchase (reduce quantity)  
- Restock (increase quantity)

### 👥 User Management (Admin Only)
- Create users  
- Get all users  
- Delete users  

### 🧰 Additional Backend Features
- Global error handler  
- `ValidationPipe` with DTO validation  
- Logging interceptor  
- Throttling (100 req/min)  
- Clean modular architecture  

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend Framework | **NestJS** |
| ORM | **Prisma** |
| Database | **PostgreSQL** |
| Cache Layer | **Redis (ioredis)** |
| Authentication | **JWT + Passport** |
| Validation | **class-validator** |

---

## 📦 Installation

### 1️⃣ Clone the repository

git clone https://github.com/yourname/sweet-shop-backend.git
cd sweet-shop-backend


### 2️⃣ Install dependencies

npm install


---

## 🔧 Environment Variables

Create a `.env` file in the root:


---

## 🧱 Prisma Setup

Generate the Prisma client:
npx prisma generate


Run migrations:

npx prisma migrate dev


---

## ▶️ Start the Backend

### Development:
npm run start:dev


### Production:
npm run build
npm start


Backend will run at:  
👉 [**http://localhost:3000**](http://localhost:3000)

---

## 📡 API Endpoints

### 🔐 Auth Routes

| METHOD | ENDPOINT | DESCRIPTION |
|--------|-----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and get JWT |

---

### 👥 Users (Admin Only)

| METHOD | ENDPOINT | DESCRIPTION |
|--------|-----------|-------------|
| GET | `/users` | List all users |
| GET | `/users/:id` | Get user details |
| DELETE | `/users/:id` | Delete user |

---

### 🍭 Sweets

| METHOD | ENDPOINT | DESCRIPTION |
|--------|-----------|-------------|
| GET | `/sweets` | Get sweets (paginated) |
| GET | `/sweets/:id` | Get sweet by ID |
| POST | `/sweets` | Create sweet |
| PUT | `/sweets/:id` | Update sweet |
| DELETE | `/sweets/:id` | Delete sweet (Admin only) |
| GET | `/sweets/search` | Search sweets |

---

### 📦 Inventory

| METHOD | ENDPOINT | DESCRIPTION |
|--------|-----------|-------------|
| POST | `/inventory/:id/purchase` | Decrease stock |
| POST | `/inventory/:id/restock` | Increase stock |

---

## 🛡️ Role-Based Access Control

| Action | USER | ADMIN |
|--------|:----:|:----:|
| View Sweets | ✅ | ✅ |
| Search Sweets | ✅ | ✅ |
| Purchase Items | ✅ | ✅ |
| Restock Items | ❌ | ✅ |
| Create Sweets | ❌ | ✅ |
| Edit Sweets | ❌ | ✅ |
| Delete Sweets | ❌ | ✅ |
| Manage Users | ❌ | ✅ |

---

## 🧪 Testing With Postman

Import these main requests for testing:

### 🔑 Login
**POST →** `/auth/login`

**Body:**
{
"email": "admin@mail.com",
"password": "admin123"
}
Copy returned token → Use in header:  
`Authorization: Bearer <token>`

---

## 📌 MY AI USAGE (MANDATORY SECTION)

### 🤖 Tools Used
- **ChatGPT (GPT-5.1, GPT-4o)**  
- **GitHub Copilot**


## 🧠 Reflection: How AI Impacted My Workflow

- Greatly reduced debugging time  
- Taught me NestJS design patterns and best practices  
- Significantly accelerated API development  
- Handled repetitive boilerplate generation efficiently  
- Helped fix complex logic and environment-related errors  
- Functioned like a **senior NestJS engineer**, guiding me through clean, production-ready architecture  

---
