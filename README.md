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
Amarjeet-Maurya-portfolio/
├── frontend/                         # React + Vite client
│   ├── public/                       # Static assets, project images, and resume
│   ├── src/
│   │   ├── assets/                   # Local images
│   │   ├── components/               # Reusable UI components
│   │   │   └── admin/                # Admin route protection
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── layouts/                  # Shared page layout
│   │   ├── pages/                    # Public pages
│   │   │   └── admin/                # Admin dashboard pages
│   │   ├── services/                 # API client
│   │   ├── utils/                    # Shared constants and utilities
│   │   ├── App.jsx                   # Application routes
│   │   └── main.jsx                  # Client entry point
│   ├── package.json                  # Frontend dependencies and scripts
│   └── vite.config.js
├── server/                           # Express API
│   ├── config/                       # Cloudinary configuration
│   ├── middleware/                   # Auth, upload, and error handling
│   ├── models/                       # Mongoose data models
│   ├── routes/                       # API endpoints
│   ├── utils/                        # Environment validation
│   ├── validation/                   # Request validators
│   ├── index.js                      # Server entry point
│   ├── seed.js                       # Database seeding script
│   └── package.json                  # Backend dependencies and scripts
├── dist/                             # Generated frontend build output
└── README.md
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
1. Deploy `server/` to a Node-friendly host (Render, Railway, etc.) and set the environment variables listed above. Set `FRONTEND_URL` to the exact deployed frontend origin.
2. Deploy `frontend/` to Vercel, setting `VITE_API_URL` to the deployed backend URL (for example, `https://your-api.example.com`). Rebuild/redeploy after changing it.
3. Update `FRONTEND_URL` in the backend `.env` to match your deployed frontend URL (for CORS).

---

## 📄 License

This project is open source. Feel free to fork it and adapt it for your own portfolio.

---

## 🙋 Author

**Amarjeet Maurya**
Portfolio: [amarjeet-maurya-portfolio.vercel.app]
GitHub: [@Amarjeet274]
