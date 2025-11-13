# XE Web Challenge Submission

A full-stack real estate advertisement platform built with React, TypeScript, Express, and SQLite.

## Solution Overview

This application was developed as a solution to the XE Web Challenge. It allows users to create and view real estate advertisements with different property types (Apartments, Detached Houses, Plots). The form dynamically adjusts fields based on property type selection, and implements conditional validation rules. Location search uses the provided XE autocomplete API with caching. All data is stored in a local SQLite database.

## Prerequisites

- Node.js (version 18 or higher)
- npm

## Setup Instructions

### 1. Install Dependencies

From the root directory:

```bash
npm run install:all
```

### 2. Configure Environment Variables

**Backend** - Copy and configure:

```bash
cp backend/.env.example backend/.env
```

Then edit `backend/.env` and replace `WEB_CHALLENGE_AUTOCOMPLETE_API` with the actual autocomplete API URL provided in the challenge. You can also change the `PORT` if needed (default is 4000).

**Frontend** - Copy and configure:

```bash
cp frontend/.env.example frontend/.env
```

Then edit `frontend/.env` and replace `BACKEND_PORT` with the port your backend server is running on (e.g., `http://localhost:4000` if using the default port).

### 3. Run the Application

From the root directory:

```bash
npm run dev
```

This starts both backend and frontend servers:

- Backend: http://localhost:4000
- Frontend: http://localhost:5173

## What's Included

### Application Features

- Three pages: Home, Create Ad, View All Ads
- Dynamic form with conditional fields based on property type
- Image upload with drag & drop support and preview
- Location autocomplete with caching and debouncing
- Real-time validation
- Responsive design with light/dark theme toggle
- Auto-seeded database with 6 sample ads including images

### Property Types

**Apartments**: Apartment type, floor, energy class, bedrooms, bathrooms, wc's, condition

**Detached Houses**: Number of floors, energy class, bedrooms, bathrooms, wc's, condition

**Plots**: Area size, condition, no building-specific fields

### Technical Implementation

- Shared Zod validation schema between frontend and backend
- Conditional validation for property-specific fields
- Image upload using Multer with multipart/form-data
- Image storage in local filesystem with static file serving
- SQLite database with imageUrl field for storing image paths
- In-memory caching for autocomplete API (5-minute TTL)
- React Hook Form for form management
- TypeScript throughout

## API Endpoints

- `GET /api/autocomplete?input=<search>` - Location autocomplete
- `POST /api/ads` - Create new ad (supports multipart/form-data for image upload)
- `GET /api/ads` - List all ads

## Static Files

- `/uploads/:filename` - Uploaded images (served statically)

## Technologies Used

**Frontend**: React, TypeScript, Vite, TailwindCSS, DaisyUI, React Hook Form, Zod, Framer Motion

**Backend**: Express, TypeScript, SQLite, Zod, Node-Cache, Multer

## Notes

- The SQLite database file is automatically created on first run
- Mock data with 6 sample ads is inserted automatically with Unsplash images
- Uploaded images are stored in `backend/uploads/` directory
- Image upload supports JPEG, PNG, GIF, and WebP formats (max 40MB)
- No external database setup required

---

Thank you for reviewing this submission. If you have any questions or need clarification on any implementation details, please don't hesitate to reach out.
