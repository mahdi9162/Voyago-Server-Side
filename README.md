# 🚗 Voyago Server — REST API for Smart Vehicle Booking

This repository contains the backend API for **Voyago – Smart Vehicle Booking Platform**.  
It exposes REST endpoints for managing vehicles and ride bookings, built with **Node.js**, **Express**, and **MongoDB**.

---

## 🔗 Related Links

- **Voyago Client (Live):** https://voyago-2805d.web.app/
- **Voyago Client Repo:** https://github.com/mahdi9162/Voyago-Client-Side
- **Voyago Server (Live API):** https://voyago-server-side.vercel.app/

---

**Health Check:**

```
GET /
```

**Response:**  
Server returns a simple → `"Server is Running Fine"`

---

## 🧰 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas

**Other Libraries:**

- `cors` – enable CORS
- `dotenv` – load environment variables

---

## 🗂 Database & Collections

**Database Name:** `voyago-db`

**Collections:**

- `vehicles` → all vehicle listings
- `bookings` → ride booking requests

---

# 🚦 API Overview

All endpoints use the base URL. Example:

```
GET https://voyago-server-side.vercel.app/vehicles
```

---

## 1️⃣ Vehicles API

### ➤ Get all vehicles

```
GET /vehicles
```

Returns an array of all vehicles.

---

### ➤ Get a single vehicle by ID

```
GET /vehicles/:id
```

Finds a vehicle by **MongoDB ObjectId**.

---

### ➤ Get vehicles for a specific host

```
GET /my-vehicles?email={userEmail}
```

Filters vehicles by host email.

---

### ➤ Get latest vehicles

```
GET /latest-vehicles
```

Returns **6 latest vehicles**, sorted by `createdAt` (descending).

---

### ➤ Create a new vehicle

```
POST /vehicles
Content-Type: application/json
```

Body contains full vehicle object (model, price, location, features, etc.).  
Inserts the vehicle into `vehicles` collection.

---

### ➤ Update a vehicle

```
PUT /vehicles/:id
Content-Type: application/json
```

Updates the selected vehicle using `$set`.

---

### ➤ Delete a vehicle

```
DELETE /vehicles/:id
```

Deletes the vehicle by ObjectId.

---

## 2️⃣ Bookings API

All booking routes use the **bookings** collection.

### ➤ Get bookings for a user

```
GET /bookings?email={userEmail}
```

Returns all bookings for a user (sorted ascending by `tripStartDate`).

---

### ➤ Get a single booking

```
GET /bookings/:id
```

Fetch booking by ID.

---

### ➤ Create a new booking

```
POST /bookings
Content-Type: application/json
```

Inserts a new booking document.

---

### ➤ Update a booking

```
PUT /bookings/:id
Content-Type: application/json
```

Updates booking fields using `$set`.

---

### ➤ Delete a booking

```
DELETE /bookings/:id
```

Removes a booking document.

---

## ⚙️ Configuration

Create a `.env` file in the root directory:

```
PORT=3000
DB_USERNAME=yourMongoUsername
DB_PASSWORD=yourMongoPassword
NODE_ENV=development
```

These variables build the MongoDB URI and configure the server port.

---

## 🚀 Running the Server Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mahdi9162/Voyago-Server-Side.git
cd Voyago-Server-Side
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add `.env` file

(as shown above)

### 4️⃣ Start the server

```bash
npm start
```

Runs the script:

```
"start": "node index.js"
```

Server listens on the `PORT` from `.env`, or **3000** as fallback.

---

## 🧪 Notes & Limitations

- No authentication/JWT in the API layer —  
  The client app sends the user email as needed.
- CORS is enabled globally to allow React client communication.
- This API is designed specifically for the Voyago client and uses matching data shapes.

---
