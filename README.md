# TripSync ✈️

**TripSync – An Intelligent Traveller Matching and Collaborative Trip Planning Platform**

TripSync is an MCA major project focused on helping travellers discover compatible companions, create trips, collaborate in groups, plan itineraries and manage shared expenses.

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Real-time: Socket.IO
- Authentication: JWT + bcrypt
- AI/ML: compatibility matching, destination recommendations and AI itinerary generation
- DevOps: GitHub, Docker, GitHub Actions

> RAG and vector databases are intentionally out of scope.

## Repository

```text
TripSync/
├── frontend/   # React application
├── backend/    # Express API
└── docs/       # Project documentation
```

## Local development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend health endpoint: `GET /api/health`

## Build roadmap

1. Frontend foundation and responsive UI
2. Authentication and profiles
3. Trip management
4. Traveller discovery and compatibility matching
5. Requests and groups
6. Real-time chat and notifications
7. Itinerary, maps and expenses
8. Safety and admin
9. AI/ML recommendations and itinerary generation
10. Testing, Docker, CI/CD and cloud deployment
