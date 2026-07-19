# AEON Bank 2026 - Secure Web Portal

This repository contains the Take-Home Web Engineer Assessment project for AEON Bank 2026. It is a secure, role-based banking web application built with modern web technologies, following strict architectural patterns to ensure scalability and maintainability.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI & Styling**: React 19, [Tailwind CSS v4](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)
- **State & Routing**: React Context API (`AuthProvider`), Next.js Navigation

## 📁 Project Architecture

The project strictly follows the **Atomic Design Pattern** for UI components to maximize reusability. All business logic is extracted into custom hooks and utility files.

```
/
├── app/                  # Next.js App Router (Pages & API Routes)
│   ├── api/              # Mock backend API routes
│   ├── authentication/   # Login pages
│   └── dashboard/        # Protected routes (Overview, Transactions)
├── components/           # UI Components (Atomic Design)
│   ├── atoms/            # Basic building blocks (Buttons, Inputs)
│   ├── molecules/        # Composed components (FormFields, MfaInputs)
│   ├── organisms/        # Complex sections (LoginForm, TransactionTable)
│   └── templates/        # Page layouts
├── providers/            # React Context Providers
├── hooks/                # Custom React Hooks (useAuth, useIdleTimeout)
├── utilities/            # Helper functions (api.ts, crypto.ts)
└── __tests__/            # Unit and Component test suites
```

## 🛠️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v20+ recommended).

### 1. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 2. Running the Development Server

Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Unauthenticated users will be automatically redirected to the secure login flow.

## 🧪 Testing

The project is heavily tested using Vitest. Our test suites cover core utilities, custom hooks (including complex timer mocks), isolated UI components, and end-to-end simulated flows.

To run the test suite in watch mode:

```bash
npm run test
```

## 🔐 Mock Authentication

The application features a fully mocked multi-step login flow (Email -> Word Verification -> Client-Side Hashed Password -> 2FA).

To test the role-based route guards, use the following credentials:

| Role       | Email Address          | Password                  | MFA Code | Notes                                                                       |
| :--------- | :--------------------- | :------------------------ | :------- | :-------------------------------------------------------------------------- |
| **Maker**  | `maker@dummybank.com`  | _(Any string > 10 chars)_ | `123456` | Has access to all dashboard pages including Transactions.                   |
| **Viewer** | `viewer@dummybank.com` | _(Any string > 10 chars)_ | `123456` | Restricted access. Redirected to Overview if trying to access Transactions. |

_Note: The application includes a strict idle timeout. You will receive a warning after 10 seconds of inactivity and will be forcibly logged out after 30 seconds._
