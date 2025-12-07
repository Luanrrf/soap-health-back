## 🚀 Recommendations

* **Runtime:** Node.js (v22.20.0)
* **Package Manager:** pnpm

## ⚙️ Installation & Setup

Follow the steps below to run the backend project locally.

### Prerequisites

Make sure you have **Node.js** version **v22.20.0** or higher and the **pnpm** package manager installed on your machine.

### Install Dependencies

Use pnpm to install all project dependencies:

```
pnpm install
```

### ▶️ Running the Project

To start the backend server, run:

```
pnpm start
```

The backend will be available at [http://localhost:3000](http://localhost:3000) by default.

## ⚠️ Any Known Limitations

* The backend currently does not include a database.
* Because of this, any data created or modified during runtime will **not persist** after the server is restarted.
* All data is temporarily stored in memory, so stopping or restarting the server will reset it.

## 📝 Notes

* Make sure the backend is running before starting the front-end to ensure all API requests function correctly.
