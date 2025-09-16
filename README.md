# SaludDigna – Medical Appointment Management Frontend

SaludDigna is a frontend application designed to manage medical appointments, patients, addresses, and prescriptions. It includes basic authentication to secure endpoints, ensuring only authenticated users can access specific resources.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Requirements](#requirements)
- [Learn More](#learn-more)

## Project Structure

```
saludDigna/
├── src/
│   ├── api/               # API calls and services
│   ├── assets/            # Images, icons, and static assets
│   ├── components/        # Reusable Vue components
│   ├── router/            # Vue Router configuration
│   ├── stores/            # Pinia or Vuex state management
│   ├── style.css          # Global CSS styles
│   ├── utils/             # Utility functions and helpers
│   ├── views/             # Application pages and views
│   ├── App.vue            # Root Vue component
│   └── main.js            # Entry point
├── public/                # Public static assets
├── index.html             # Main HTML file
├── package.json           # Project metadata and scripts
├── package-lock.json      # Dependency lock file
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Features

- Patient management (create, update, delete)
- Medical appointment scheduling
- Address management
- Prescription tracking
- Basic user authentication
- Protected routes for authenticated users
- Responsive interface with Vue.js

## Installation

1. Clone the repository:

```bash
git clone https://github.com/LSCasas/saludDigna.git
cd saludDigna
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm run serve
```

## Usage

Once the server is running, open [http://localhost:5173](http://localhost:5173) in your browser.

- Log in to access protected resources
- Manage patients, appointments, addresses, and prescriptions
- View and update patient information
- Schedule and track medical appointments

## Requirements

- Node.js >= 18.x
- npm
- Modern web browser

## Learn More

- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
