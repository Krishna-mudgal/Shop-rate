# ShopRate -- Store Rating Platform

ShopRate is a **role-based web application** that allows users to rate stores, store owners to track ratings, and administrators to manage the entire system.

The project is built using a **modern full-stack architecture** with clear separation of concerns and secure authentication.

---

## Features Overview

### Authentication & Authorization

- Single login system for all roles

- JWT-based authentication stored in **HTTP-only cookies**

- Role-based access control

- Secure logout functionality

---

## User Roles & Functionalities

### Normal User

- Sign up and log in

- Update password

- View all registered stores

- Search stores by **name** and **address**

- Submit a rating (1--5) for a store

- Update previously submitted rating

- Logout

---

### Store Owner

- Log in

- Update password

- View dashboard:

  - List of users who rated their store

  - Average store rating

- Logout

---

### System Administrator

- Log in

- Dashboard with:

  - Total users

  - Total stores

  - Total ratings

- Add:

  - Normal users

  - Store owners

  - Admin users

  - Stores

- View and filter users by:

  - Name

  - Email

  - Address

  - Role

- View store list with average ratings

- View detailed user profile

  - Includes average rating if user is a store owner

- Logout

---

## Tech Stack

### Frontend

- **React**

- **React Router**

- **React Hook Form**

- **Tailwind CSS** (dark theme)

- Fetch API (no Axios)

### Backend

- **Node.js**

- **Express.js**

- **Sequelize ORM**

- **MySQL**

- **JWT Authentication**

- MVC Architecture

---

## Architecture

### Backend (MVC)

```text
backend/
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
└── server.js
```

### Frontend

```text
frontend/
├── pages/
│   ├── admin/
│   ├── user/
│   ├── owner/
├── components/
├── App.jsx
└── main.jsx
```

---

## Authentication Flow

- JWT generated on login/signup

- Token stored in **HTTP-only cookie**

- `credentials: "include"` used in frontend fetch requests

- Backend middleware validates token and role on each protected route

---

## Form Validations

### Frontend Validations

- **Name**: 20--60 characters

- **Address**: Max 400 characters

- **Email**: Standard email format

- **Password**:

  - 8--16 characters

  - At least 1 uppercase letter

  - At least 1 special character

Backend assumes **frontend sends valid data**.

---

## Environment Variables

Create a `.env` file in `backend/`:

```text
PORT=5000
DB_NAME=shop_rate
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your_secret_key`
```

---

## Running the Project

### Backend

`cd backend
npm install
npm run dev`

### Frontend

`cd frontend
npm install
npm run dev`

Frontend runs on:\
`http://localhost:5173`

Backend runs on:\
`http://localhost:5000`

---

## Sample API Endpoints

### Auth

- `POST /api/auth/signup`

- `POST /api/auth/login`

- `POST /api/auth/logout`

### Admin

- `GET /api/admin/dashboard`

- `POST /api/admin/users`

- `POST /api/admin/stores`

- `GET /api/admin/users`

- `GET /api/admin/users/:id`

- `GET /api/admin/stores`

### User

- `GET /api/user/stores`

### Owner

- `GET /api/owner/dashboard`

### Rating

- `POST /api/user/ratings`

---

## UI Design

- Fully dark-themed UI

- Responsive layouts

- Centered cards & dashboards

- Consistent button placement (top-right actions)

- Clean admin panel design

---

## Project Status

Authentication & Roles\
Admin Management\
User Rating Flow\
Owner Dashboard\
Frontend + Backend Integration\
Secure Cookie-based Auth

---
