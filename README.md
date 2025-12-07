## 🚀 Recommendations

* **Runtime:** Node.js (v22.20.0)
* **Package Manager:** pnpm

## ⚙️ Installation & Setup

Follow the steps below to run the backend project locally.

### Prerequisites

Make sure you have **Node.js** version **v22.20.0** or higher and the **pnpm** package manager installed on your machine.

### Install Dependencies

Use pnpm to install all project dependencies:

```bash
pnpm install
```

### ▶️ Running the Project

To start the backend server, run:

```bash
pnpm start
```

The backend will be available at [http://localhost:3001](http://localhost:3001) by default.

### 🧪 Running Tests

To run the test suite, use:

```bash
pnpm test
```

For continuous test execution during development (watch mode):

```bash
pnpm test:watch
```

To generate a test coverage report:

```bash
pnpm test:cov
```

The project includes comprehensive unit tests for:
- **Controllers:** Validation of HTTP endpoints and request/response handling
- **Services:** Business logic and data manipulation
- **Integration:** End-to-end testing of complete features

All tests are written using **Jest** and follow NestJS testing best practices.

## ⚠️ Any Known Limitations

* The backend currently does not include a database.
* Because of this, any data created or modified during runtime will **not persist** after the server is restarted.
* All data is temporarily stored in memory, so stopping or restarting the server will reset it.

## 📝 Notes

* Make sure the backend is running before starting the front-end to ensure all API requests function correctly.
* Run tests before committing changes to ensure code quality and prevent regressions.