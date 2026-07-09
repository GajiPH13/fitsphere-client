# 🏋️ FitSphere – Modern Full-Stack Fitness Management Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss" />
</p>

---

# 📖 Overview

**FitSphere** is a modern, production-inspired **Fitness Management Platform** designed to streamline the interaction between **members**, **trainers**, and **administrators**.

Unlike traditional fitness websites that simply display classes, FitSphere simulates the workflow of a real commercial fitness platform—from trainer applications and class approvals to secure bookings, subscriptions, role-based dashboards, payment processing, and community engagement.

This project demonstrates how multiple real-world business processes can be integrated into a single scalable web application.

---

## 🌐 Live Demo

👉 https://fitsphere-client-pied.vercel.app

---
# 🎯 Project Purpose

The primary objective of FitSphere is to solve several practical challenges faced by modern fitness organizations:

- Managing multiple user roles securely
- Allowing trainers to publish and manage classes
- Enabling members to book and pay for sessions
- Giving administrators complete control over the platform
- Creating an engaging fitness community through forums
- Simulating a real SaaS-style fitness ecosystem

Rather than focusing on isolated features, FitSphere emphasizes **business workflow automation** and **user experience**.

---

# 📚 Small Case Study

### Problem

Many local gyms and fitness studios still rely on spreadsheets, social media messaging, and manual communication to:

- Manage class schedules
- Track bookings
- Approve trainers
- Handle payments
- Organize members

These manual processes become increasingly inefficient as the business grows.

---

### Solution

FitSphere digitizes the entire workflow by providing:

- A centralized class management system
- Automated booking management
- Trainer application approval workflow
- Role-based dashboards
- Secure authentication
- Online payment integration
- Community forum for engagement

The result is a streamlined digital platform that reduces administrative workload while improving user experience.

---

# ✨ Why This Project is Different

Many portfolio fitness projects stop at:

- CRUD Operations
- Login & Registration
- Static Dashboards

FitSphere goes much further.

### ✔ Real-world Business Logic

Instead of simply creating data, users interact through a realistic approval workflow.

Example:

Member → Applies as Trainer  
⬇  
Admin Reviews Application  
⬇  
Admin Approves / Rejects  
⬇  
Trainer Creates Classes  
⬇  
Admin Reviews Classes  
⬇  
Members Book Classes  
⬇  
Stripe Payment  
⬇  
Trainer Views Attendees

This creates interconnected user journeys similar to production SaaS products.

---

### ✔ Three Independent User Dashboards

Each role has a completely different experience.

#### 👤 Member

- Browse Classes
- Book Classes
- Manage Bookings
- Save Favorites
- Purchase Membership
- Apply as Trainer
- Participate in Community Forum

---

#### 🏋 Trainer

- Create Fitness Classes
- Upload Class Images
- View Booked Members
- Manage Own Classes
- Participate in Community Discussions

---

#### 🛡 Admin

- Manage Users
- Block / Unblock Accounts
- Promote Users
- Review Trainer Applications
- Approve / Reject Classes
- Delete Classes
- Platform Analytics Dashboard
- Moderate Forum

---

# 🚀 Core Features

## Authentication

- Better Auth
- Role-Based Authorization
- Protected Routes
- Secure Session Management

---

## Fitness Classes

- Trainer Class Creation
- Image Upload (ImgBB)
- Pending Approval Workflow
- Category Filtering
- Search
- Ratings
- Favorites

---

## Booking System

- Class Booking
- Capacity Management
- Payment Tracking
- Booking History
- Trainer Attendee List

---

## Membership

- Stripe Payment Integration
- Subscription Management
- Membership Upgrade Flow

---

## Forum

- Community Discussion
- Member Interaction
- Admin Moderation

---

## Dashboard

Separate dashboards for:

- Members
- Trainers
- Administrators

---

## Admin Analytics

Interactive dashboard built using **Recharts**

Includes:

- Revenue
- Users
- Bookings
- Trainer Statistics
- Class Statistics

---

## UI/UX

- Fully Responsive
- Glassmorphism Design
- Dark / Light Theme
- Animated Components
- Mobile Navigation
- Professional Dashboard Layouts

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React 19
- Tailwind CSS v4
- HeroUI
- React Hot Toast
- Recharts
- Framer Motion

---

## Backend

- Node.js
- Express.js
- MongoDB

---

## Authentication

- Better Auth

---

## Payment

- Stripe

---

## Image Hosting

- ImgBB API

---

# 🧠 Architecture Highlights

- Component-Based Architecture
- RESTful API Design
- Protected API Endpoints
- Modular Folder Structure
- Reusable UI Components
- Role-Based Authorization
- Responsive Design Principles

---

# 🌙 User Experience

FitSphere emphasizes usability through:

- Clean Information Hierarchy
- Responsive Design
- Modern Dashboard Interfaces
- Interactive Feedback
- Confirmation Modals
- Toast Notifications
- Theme Switching
- Accessible Navigation

---

# 📂 Project Structure

```
src/
│
├── app/
│   ├── dashboard/
│   ├── auth/
│   ├── allclasses/
│   ├── forum/
│   └── ...
│
├── components/
│   ├── dashboard/
│   ├── providers/
│   ├── shared/
│   └── ui/
│
├── lib/
│
├── hooks/
│
└── styles/
```

---

# 🔐 Environment Variables

Create a `.env.local`

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_IMGBB_API_KEY=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

MONGODB_URI=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

---

# ⚙ Installation

```bash
git clone https://github.com/GajiPH13/fitsphere-client

cd fitsphere

npm install

npm run dev
```

---

# 📈 Future Improvements

- Real-time Notifications
- Live Chat
- Trainer Calendar
- Attendance QR Check-in
- Email Notifications
- AI Workout Recommendations
- Fitness Progress Tracking
- Admin Reporting Export
- Mobile Application

---

# 💡 What This Project Demonstrates

This project demonstrates my ability to build and integrate:

- Full-Stack Development
- Authentication & Authorization
- REST API Design
- Payment Integration
- Database Design
- Responsive UI/UX
- Dashboard Development
- Business Workflow Modeling
- State Management
- Modern React Patterns
- Production-Oriented Architecture

---

# 👨‍💻 Developer

**Gaji Najrul Islam**

Full Stack Web Developer

Passionate about building scalable, production-ready web applications with modern technologies while focusing on clean architecture, performance, and user experience.

---

# ⭐ Final Note

FitSphere was developed not simply as another CRUD portfolio project, but as a realistic simulation of a commercial fitness management platform. The focus was on implementing real business workflows, role-based access control, scalable architecture, and polished user experiences—skills directly applicable to professional software development environments.
