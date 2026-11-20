# Issue Tracker

A full-stack Issue Tracker application built using Next.js. It allows users to authenticate using GitHub or Google and manage their issues securely.

## Features

- GitHub and Google authentication using Auth.js
- User-specific issue management
- Create, Read, Update and Delete (CRUD) operations
- Input validation using Zod
- Database management using Prisma ORM
- SQLite database integration
- Optimistic UI updates using React's `useOptimistic`
- Cache management using Next.js Cache Components
- Optimistic Concurrency Control (OCC)
- User ownership and authorization checks

## Tech Stack

- Next.js 16
- React 19
- JavaScript
- Auth.js (NextAuth.js)
- Prisma ORM 7
- SQLite
- Zod

## Project Structure

```text
issue-tracker/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── issueActions.js
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.js
│   │   ├── login/
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── IssueForm.jsx
│   │   ├── IssueDashboardClient.jsx
│   │   ├── EditIssueForm.jsx
│   │   ├── DeleteIssueButton.jsx
│   │   └── SubmitButton.jsx
│   │
│   ├── lib/
│   │   ├── prisma.js
│   │   └── issues.js
│   │
│   ├── validators/
│   │   └── issueSchema.js
│   │
│   └── auth.js
│
├── .env
├── prisma7.config.ts
└── package.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd issue-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory.

Add the required configuration for:

- Auth.js secret
- GitHub OAuth credentials
- Google OAuth credentials
- Database connection

Use the exact environment variable names configured in your project.

**Important:** Never upload your `.env` file or expose your OAuth secrets publicly.

### 4. Set up the database

Run the Prisma migrations:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Application Workflow

1. Users sign in using GitHub or Google.
2. Auth.js manages authentication and sessions.
3. The dashboard fetches issues belonging to the authenticated user.
4. Users can create, edit, view and delete issues.
5. Zod validates form data before database operations.
6. Prisma communicates with the SQLite database.
7. `useOptimistic` provides immediate UI updates.
8. `cacheTag()` and `updateTag()` manage user-specific cached issue data.
9. OCC checks issue versions to prevent stale updates from overwriting newer changes.

## Key Concepts Implemented

- Next.js Server Components and Client Components
- Server Actions
- Authentication and OAuth
- Session management
- Prisma ORM and database relationships
- Zod schema validation
- Optimistic UI and rollback
- Cache invalidation
- Optimistic Concurrency Control

## Future Improvements

- Issue status management
- Search and filtering
- Pagination
- Automated testing
- Production deployment

---

**Developed as a learning project to practice full-stack development with Next.js, authentication, database management, caching and concurrency control.**