# 🚀 Amarjeet Maurya — 3D Developer Portfolio

A full-stack, 3D-animated personal portfolio built with **React + Three.js** on the frontend and a **Node.js/Express/MongoDB** backend, complete with an admin dashboard to manage projects and skills dynamically.

🔗 **Live Demo:** [amarjeet-maurya-portfolio.vercel.app](https://amarjeet-maurya-portfolio.vercel.app/)
📦 **Repository:** [Amarjeet274/My-Portfolio-Application](https://github.com/Amarjeet274/My-Portfolio-Application)

---

## ✨ Features

- **Interactive 3D UI** — built with Three.js, React Three Fiber, and Drei for immersive visuals
- **Smooth animations** — powered by Framer Motion and React Spring
- **Public-facing pages** — Landing, About, Skills, Projects, Achievements, and Contact
- **Working contact form** — sends emails directly to the owner via Nodemailer
- **Admin dashboard** — secure login (JWT-based auth) to add/edit/delete projects and skills
- **Image uploads** — project images stored and served via Cloudinary
- **Form validation** — client-side with React Hook Form, server-side with express-validator
- **Responsive design** — styled with Tailwind CSS
- **Toast notifications** — via react-hot-toast for user feedback

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- Three.js / @react-three/fiber / @react-three/drei / @react-three/postprocessing
- Framer Motion, React Spring
- React Router DOM
- React Hook Form
- react-hot-toast / react-icons / react-scroll

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for admin authentication
- bcryptjs for password hashing
- Multer + Cloudinary for image uploads
- Nodemailer for the contact form
- express-validator for request validation

**Deployment**
- Frontend hosted on **Vercel**

---

## 📁 Project Structure

```
My-Portfolio-Application/
├── public/               # Static assets (resume, favicon, etc.)
├── src/                  # Frontend source
│   ├── assets/           # Images, 3D models, etc.
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Layout wrappers
│   ├── pages/            # Route-level pages (Home, About, Projects, Contact...)
│   │   └── admin/        # Admin dashboard pages (Login, Dashboard, Projects, Skills, Profile)
│   ├── services/         # API service calls
│   ├── utils/            # Helper utilities
│   ├── App.jsx
│   └── main.jsx
├── server/               # Backend (Express API)
│   ├── config/           # Cloudinary config
│   ├── middleware/       # Auth, upload, error handling
│   ├── models/           # Mongoose models (User, Profile, Project, Skill)
│   ├── routes/           # API routes (auth, profile, projects, skills, contact)
│   ├── validation/       # Request validators
│   ├── utils/            # Env validation
│   ├── seed.js           # Database seeding script
│   └── index.js          # Server entry point
├── package.json          # Frontend dependencies
└── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB database (local or Atlas)
- A Cloudinary account (for image uploads)
- A Gmail (or SMTP) account for sending contact form emails

### 1. Clone the repository

```bash
git clone https://github.com/Amarjeet274/My-Portfolio-Application.git
cd My-Portfolio-Application
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/` with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
RECIPIENT_EMAIL=where_contact_messages_should_go@example.com

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the backend:

```bash
npm run dev     # development (with nodemon)
npm start        # production
```

The API will be available at `http://localhost:5000`.

### 3. Set up the frontend

From the project root:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. (Optional) Seed the database

```bash
cd server
node seed.js
```

---

## 🔌 API Overview

| Route                                Description                             |
|---------------------------------------|------------------------------------------|
| `POST /api/auth/login`                | Admin login, returns a JWT               |
| `GET/POST/PUT/DELETE /api/profile`    | Manage profile information               |
| `GET/POST/PUT/DELETE /api/projects`   | Manage portfolio projects                |
| `GET/POST/PUT/DELETE /api/skills`     | Manage skills list                       |
| `POST /api/contact`                   | Sends a contact form message via email   |

> Admin-only routes are protected using JWT-based middleware (`server/middleware/auth.js`).

---

## 🚀 Deployment

The frontend is deployed on **Vercel**: [amarjeet-maurya-portfolio.vercel.app](https://amarjeet-maurya-portfolio.vercel.app/)

To deploy your own copy:
1. Deploy `server/` to a Node-friendly host (Render, Railway, etc.) and set the environment variables listed above.
2. Deploy the root frontend to Vercel, setting an environment variable pointing to your deployed API URL.
3. Update `FRONTEND_URL` in the backend `.env` to match your deployed frontend URL (for CORS).

---

## 📄 License

This project is open source. Feel free to fork it and adapt it for your own portfolio.

---

## 🙋 Author

**Amarjeet Maurya**
Portfolio: [amarjeet-maurya-portfolio.vercel.app]
GitHub: [@Amarjeet274]