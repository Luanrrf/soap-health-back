## 🚀 Recommendations

- **Runtime:** Node.js (v22.20.0)
- **Package Manager:** pnpm

## ⚙️ Installation & Setup

Follow the steps below to run the backend project locally.

### Prerequisites

Make sure you have **Node.js** version **v22.20.0** or higher and the **pnpm** package manager installed on your machine.

### Install Dependencies

Install all dependencies with:

```bash
pnpm install
```

### ▶️ Running the Project

To start the backend server, run:

```bash
pnpm start
```

The backend will be available at **http://localhost:3001** by default.

---

## 🧪 Running Tests

Run all unit tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

Generate coverage report:

```bash
pnpm test:cov
```

The project includes unit tests for:

- Controllers
- Services
- Integration-style flows

All tests follow NestJS + Jest best practices.

---

## 🧷 Pre-commit Tests (Husky)

This backend uses **Husky** to enforce code quality before each commit.

The following checks run automatically:

- **ESLint** — code linting
- **Prettier** — formatting check
- **Unit tests** — ensures no regressions
- **TypeScript type-check** (if configured)

If any check fails, the commit is **blocked**.

Reinstall Husky hooks if needed:

```bash
pnpm prepare
```

---

## 🔄 CI/CD Pipeline Checks

A GitHub Actions workflow is configured to validate every:

- **push**
- **pull request**

The pipeline performs:

### ✅ Lint & Format Check

- Runs ESLint
- Validates Prettier formatting

### 🏗️ Build Check

- Installs dependencies
- Builds the project to ensure no compilation issues

### 🧪 Unit Tests + Coverage

- Runs Jest test suite
- Generates coverage report
- Uploads coverage to **Codecov**
- Displays coverage summary

### 🔐 Security Audit

- Runs `pnpm audit`
- Checks for outdated dependencies

### 🧠 TypeScript Type Check

- Compiles TypeScript with `--noEmit`

### 🚧 Quality Gate (Final Check)

Ensures all previous jobs succeeded:

- Lint
- Build
- Test
- Type-check

If any job fails, the Quality Gate returns **failure**.

This guarantees that **no broken code** enters the repository.

---

## ⚠️ Any Known Limitations

- There is currently **no database**.
- Data does **not persist** after restarting the server.
- All mocks live in local JSON files and are loaded in memory at runtime.

---

## 📝 Notes

- Start the backend before running the front-end.
- Always run tests before committing changes.
- The CI pipeline ensures the repository stays clean, consistent, and production-ready.
