# Product Catalog Application

A modern, responsive web application for managing and showcasing products with advanced features and a beautiful user interface.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Package Details](#package-details)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## 🔍 Overview
This project is a product management system built with React and Vite, featuring dual view modes (table and grid), real-time search, dynamic filtering, favorites system, and detailed product modals. The application consumes data from the DummyJSON API to showcase smartphone products.

## ✨ Features

### Core Functionality
- **Dual View Modes**
  - Table view for efficient data browsing and sorting
  - Grid view for visual product showcase
  - Seamless switching between views
  - Responsive design for all device sizes

- **Product Management**
  - Real-time search functionality with debounce
  - Dynamic filtering by brand, price range, and availability
  - Sorting options (price: low to high, high to low, rating)
  - Favorites system (toggle favorite status)
  - Shopping cart functionality (add/remove items)
  - Product quantity management in cart

- **User Interface**
  - Interactive product cards with hover effects
  - Loading skeletons for better UX during data fetching
  - Animated transitions using Framer Motion
  - Detailed product modal with image carousel
  - Price formatting with thousand separators
  - Discount badges and ratings display
  - Responsive pagination controls
  - Toast notifications for user actions

- **Mobile Experience**
  - Fully responsive layout
  - Touch-friendly controls
  - Optimized image loading
  - Collapsible filters on mobile

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - JavaScript library for building user interfaces
- **Vite 5.4.10** - Next-generation frontend tooling for fast development
- **Material-UI (MUI) 6.1.7** - React component library for UI components
- **React Router DOM 6.28.0** - Declarative routing for React applications
- **Axios 1.7.7** - Promise-based HTTP client for API requests
- **Framer Motion 11.11.17** - Animation library for React
- **Lucide React 0.460.0** - Beautiful & consistent icon toolkit
- **React Toastify 10.0.6** - Notification system for React

### Styling
- **Tailwind CSS 3.4.15** - Utility-first CSS framework
- **PostCSS 8.4.49** - Tool for transforming CSS with JavaScript
- **Autoprefixer 10.4.20** - Parse CSS and add vendor prefixes
- **@emotion/react & @emotion/styled** - CSS-in-JS library for styling

### Development Tools
- **ESLint 9.13.0** - Pluggable linting utility for JavaScript and React
- **@vitejs/plugin-react 4.3.3** - Vite plugin for React with Fast Refresh
- **Globals 15.11.0** - Global identifiers for different environments

## 📦 Installation

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn package manager
- Git (for cloning the repository)

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/deoninja/product-catalog.git
   cd product-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all dependencies listed in `package.json` including:
   - React and React DOM
   - Vite and related plugins
   - Material-UI components
   - Axios for HTTP requests
   - Framer Motion for animations
   - Tailwind CSS and PostCSS for styling
   - ESLint for code quality

3. **Verify installation**
   Check that `node_modules` directory and `package-lock.json` were created:
   ```bash
   ls -la node_modules
   cat package-lock.json | head -5
   ```

## ▶️ Usage

### Development Server
To start the application in development mode:
```bash
npm run dev
```
The application will be available at [http://localhost:5173](http://localhost:5173)

### Production Build
To create an optimized production build:
```bash
npm run build
```
This will generate optimized assets in the `dist` directory.

### Preview Production Build
To preview the production build locally:
```bash
npm run preview
```
This serves the built application from the `dist` directory at [http://localhost:4173](http://localhost:4173)

### Linting
To check for code style issues:
```bash
npm run lint
```
This runs ESLint on all JavaScript and JSX files.

## 🔌 API Documentation

### Data Source
The application fetches product data from the [DummyJSON API](https://dummyjson.com/docs/products), specifically the smartphones endpoint.

### API Configuration
The API instance is configured in `src/services/axios.js`:

```javascript
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
```

### Endpoints Used
- **GET `/products/category/smartphones`**
  - Fetches all smartphone products
  - Returns paginated results with metadata
  - Used in `src/services/api.js` via the `getProducts()` function

### Service Layer
The API service is abstracted in `src/services/api.js`:

```javascript
import axios from './axios';

export const getProducts = async () => {
  try {
    const response = await axios.get('/products/category/smartphones');
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

### Data Structure
Each product object contains:
- `id`: Unique identifier
- `title`: Product name
- `description`: Detailed description
- `category`: Product category (always "smartphones" in this app)
- `price`: Numerical price value
- `discountPercentage`: Discount percentage applied
- `rating`: Average rating (0-5 scale)
- `stock`: Available inventory count
- `brand`: Manufacturer name
- `thumbnail`: URL to product thumbnail image
- `images`: Array of image URLs (up to 4 images)

## 📦 Package Details

### Dependencies (Runtime)

| Package | Version | Purpose |
|---------|---------|---------|
| `@emotion/react` | ^11.13.3 | CSS-in-JS library for styling MUI components |
| `@emotion/styled` | ^11.13.0 | Styled components API for emotion |
| `@fontsource/roboto` | ^5.1.0 | Roboto font package for consistent typography |
| `@mui/icons-material` | ^6.1.7 | Material Design icons |
| `@mui/material` | ^6.1.7 | Core Material-UI component library |
| `axios` | ^1.7.7 | HTTP client for API requests |
| `framer-motion` | ^11.11.17 | Animation library for React |
| `lucide-react` | ^0.460.0 | Icon collection for UI elements |
| `react` | ^18.3.1 | React library |
| `react-dom` | ^18.3.1 | React DOM for rendering |
| `react-router-dom` | ^6.28.0 | Routing library for React |
| `react-toastify` | ^10.0.6 | Notification system |

### DevDependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@eslint/js` | ^9.13.0 | ESLint core functionality |
| `@types/react` | ^18.3.12 | TypeScript definitions for React |
| `@types/react-dom` | ^18.3.1 | TypeScript definitions for React DOM |
| `@vitejs/plugin-react` | ^4.3.3 | Vite plugin for React with Fast Refresh |
| `autoprefixer` | ^10.4.20 | PostCSS plugin for vendor prefixes |
| `eslint` | ^9.13.0 | Pluggable linting utility |
| `eslint-plugin-react` | ^7.37.2 | ESLint plugin for React |
| `eslint-plugin-react-hooks` | ^5.0.0 | ESLint plugin for React Hooks |
| `eslint-plugin-react-refresh` | ^0.4.14 | ESLint plugin for Fast Refresh |
| `globals` | ^15.11.0 | Global identifiers for different environments |
| `postcss` | ^8.4.49 | Tool for transforming CSS |
| `tailwindcss` | ^3.4.15 | Utility-first CSS framework |
| `vite` | ^5.4.10 | Build tool and development server |

## 📁 Project Structure

```
product-catalog/
├── public/
│   ├── logo.png
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── ImageCarousel.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetailsModal.jsx
│   │   └── ProductFilters.jsx
│   ├── pages/
│   │   ├── ProductsTable.jsx
│   │   └── ProductShowcase.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── axios.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

### Key Files Explained

- `src/App.jsx`: Main application component with routing setup
- `src/main.jsx`: Entry point that renders the React app
- `src/pages/ProductsTable.jsx`: Table view implementation
- `src/pages/ProductShowcase.jsx`: Grid view implementation
- `src/services/axios.js`: Axios instance configuration
- `src/services/api.js`: API service functions
- `vite.config.js`: Vite configuration file
- `tailwind.config.js`: Tailwind CSS configuration
- `postcss.config.js`: PostCSS configuration
- `eslint.config.js`: ESLint configuration

## 📜 Available Scripts

In the `package.json` file, you can run the following scripts:

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server with Vite |
| `npm run build` | Builds the application for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint to check for code issues |

## 🚀 Future Enhancements

Planned improvements for the application:

1. **User Authentication System**
   - Add login/register functionality
   - Protect routes with authentication
   - Save user preferences

2. **Enhanced State Management**
   - Implement Redux or Context API for global state
   - Persist cart and favorites in localStorage
   - Share state between components efficiently

3. **Advanced Filtering & Search**
   - Add more filter options (specs, features)
   - Implement faceted search
   - Add search history and suggestions

4. **Improved Performance**
   - Implement lazy loading for images
   - Add pagination for large datasets
   - Optimize bundle size with code splitting
   - Add service workers for offline capability

5. **Testing Suite**
   - Add unit tests with Jest and React Testing Library
   - Implement end-to-end tests with Cypress
   - Add accessibility testing with axe-core

6. **Internationalization (i18n)**
   - Add support for multiple languages
   - Implement date and number formatting
   - Add RTL language support

7. **Deployment Automation**
   - Set up CI/CD pipeline with GitHub Actions
   - Add Docker containerization
   - Implement automated testing on pull requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [DummyJSON](https://dummyjson.com/) for providing the free product API
- [Material-UI](https://mui.com/) for the excellent component library
- [Vite](https://vitejs.dev/) for the fast development experience
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling approach

---

Developed with ❤️ by [Deo Ninja](https://github.com/deoninja)

Last updated: May 25, 2026