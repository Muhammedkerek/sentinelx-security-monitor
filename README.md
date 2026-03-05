# 🛡️ SentinelX – Real-Time Security Monitoring Platform

SentinelX is a real-time security monitoring backend built with Node.js, Express, Redis, and MongoDB.
It detects suspicious activity such as brute-force login attempts, applies automatic IP banning and rate limiting, and streams live security alerts to administrators via WebSocket.

This project demonstrates backend architecture design, authentication lifecycle management, Redis state handling, and real-time event-driven systems.

---

## 🚀 Tech Stack

* **Node.js** (Express)
* **MongoDB** (Mongoose)
* **Redis** (State management & token storage)
* **JWT** (Access & Refresh Tokens)
* **Socket.io** (Real-time alerts)
* **bcrypt** (Password hashing)
* **Docker & Docker Compose**

---

## 🧠 Architecture Overview

SentinelX follows a layered backend architecture:

* **Controllers** → Handle request/response logic
* **Services** → Contain business logic
* **Middleware** → Authentication, rate limiting, IP ban checks
* **Models** → MongoDB schemas
* **Redis** → Stores:

  * Failed login attempts
  * Temporary IP bans
  * Blacklisted access tokens
  * Refresh tokens

Security logs are stored in MongoDB and streamed live to admins via WebSocket.

---

## 🔐 Features

* ✅ JWT Authentication (Access + Refresh Tokens)
* ✅ Refresh Token Endpoint
* ✅ Redis-based Token Blacklist
* ✅ Role-Based Access Control (Admin/User)
* ✅ Brute-force Login Detection
* ✅ Automatic Temporary IP Banning
* ✅ Rate Limiting Middleware
* ✅ Real-time Security Alerts via Socket.io
* ✅ MongoDB Security Log Storage

---

## 🛡️ Security Concepts Implemented

This project demonstrates:

* Access token expiration handling
* Refresh token lifecycle management
* Redis-based token revocation
* Brute-force attack mitigation
* Temporary IP banning strategy
* Role-Based Authorization (RBAC)
* Event-driven security alerting

---

## 📡 Example Security Flow

1. User attempts login.
2. If credentials are incorrect:

   * Failed attempt counter increases in Redis.
   * If threshold is exceeded → IP is temporarily banned.
   * Security event is logged in MongoDB.
   * Real-time alert is emitted via WebSocket.
3. If access token expires:

   * User must request a new access token via refresh endpoint.
4. If user logs out:

   * Access token is blacklisted in Redis.

---

## 🧪 Running Locally (Without Docker)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/sentinelx-security-monitor.git
cd sentinelx-security-monitor
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
REDIS_HOST=127.0.0.1
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

### 4️⃣ Start the server

```bash
npm run dev
```

Server will run on:

```
http://localhost:3000
```

---

# 🌍 Running with Docker (Recommended)

This project is fully containerized and can be started with Docker Compose.

### Requirements

* Docker
* Docker Compose

### Start the system

```bash
docker compose up --build
```

This command will start:

* **SentinelX Backend (Node.js / Express)**
* **Redis container**

MongoDB is connected through **MongoDB Atlas**.

### Access the API

Once the containers start, the server will be available at:

```
http://localhost:3000
```

### Stop the system

```bash
docker compose down
```

---

## 🔌 WebSocket Events

The backend emits the following event:

```
security-alert
```

Payload example:

```json
{
  "ip": "127.0.0.1",
  "event": "FAILED_LOGIN",
  "attempts": 3
}
```

---

## 📂 Project Structure

```
config/
controllers/
middleware/
model/
routes/
services/
server.js
docker-compose.yml
Dockerfile
```

---

## 📈 Future Improvements

* AWS EC2 deployment
* Admin dashboard frontend
* Geolocation-based threat analysis
* Centralized logging (Winston)
* CI/CD pipeline integration

---

## 👨‍💻 Author

Muhammed Kerek
Backend Developer focused on security, real-time systems, and distributed architectures.

---

## 📜 License

This project is for educational and portfolio purposes.
