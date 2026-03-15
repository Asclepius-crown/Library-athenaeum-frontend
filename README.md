# Library Management System

A modern, full-stack library management system built with React, TypeScript, Vite, and Node.js. Features user authentication, book catalog management, borrowing system, and admin tools.

## Features

### User Features
- Browse and search physical/digital book collections
- Borrow and reserve books
- Wishlist management
- Reading streak tracking
- Fine payment system
- Personal profile with academic info

### Admin Features
- Complete book catalog management
- User management and analytics
- Bulk book imports
- Copy management per book
- Fine management
- Dashboard with statistics

### Technical Features
- TypeScript for type safety
- Responsive design with Tailwind CSS
- JWT authentication
- Real-time search with debouncing
- Modal-based interactions
- Accessibility compliant
- Comprehensive testing suite

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing

### Testing
- **Vitest** for unit/component tests
- **Playwright** for E2E tests
- **React Testing Library** for component testing

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management-system
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd vite-project
   npm install
   cp .env.example .env
   # Edit .env with backend API URL
   npm run dev
   ```

### Environment Variables

#### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/library
JWT_SECRET=your-secret-key
PORT=5000
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
library-management-system/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── vite-project/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Common/
│   │   │   ├── Admin/
│   │   │   └── Student/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── constants/
│   ├── e2e/
│   └── __tests__/
└── README.md
```

## Architecture

### Frontend Architecture
- **Component Structure**: Organized by feature (Admin, Student, Common)
- **State Management**: React Context for auth, custom hooks for logic
- **Routing**: Protected routes with role-based access
- **Styling**: Utility-first with Tailwind CSS

### Backend Architecture
- **MVC Pattern**: Controllers, Models, Routes separation
- **Middleware**: Auth, role-based access, error handling
- **Database**: MongoDB with Mongoose schemas

## Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript checks
npm run test         # Run unit tests
npm run e2e          # Run E2E tests
```

### Backend
```bash
npm run dev          # Start development server
npm run test         # Run tests
```

## Testing

The project includes comprehensive testing:

- **Unit Tests**: Hooks, utilities, API clients
- **Component Tests**: UI components with interactions
- **Integration Tests**: Auth flows, API calls
- **E2E Tests**: Full user journeys with Playwright

Run tests with:
```bash
npm run test          # Unit tests
npm run e2e           # E2E tests
```

## Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend
```bash
npm run build
# Deploy to server with PM2 or similar
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Book Catalog
![Catalog](screenshots/catalog.png)

### Admin Panel
![Admin](screenshots/admin.png)
