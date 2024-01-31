# website-link = "<https://shopping-app-liard.vercel.app/wishlist/wishlistitem>"

## Intro

This project contains a Next.js application for an online shopping platform. It utilizes Tailwind CSS for styling and integrates with the Appwrite backend for user authentication and data storage. The project structure includes components for the navbar, product listings, cart and wishlist management, and authentication.


## Project Directory Structure overview

## src/app

- page.js: Contains the main page component for the app.
- layout.js: Defines the layout for the app, including the navbar, content, and footer.
- globals.css: Contains global CSS styles for the app.


## src/app/authentication

- layout.js: Defines the layout for the authentication pages.
- signin/page.js: Manages the sign-in page layout and functionality.


## src/app/cart

- cartitems/page.js: Manages the cart items page layout and functionality.

## src/app/wishlist

- wishlistitem/page.js: Manages the wishlist item page layout and functionality.

## src/components

- navbar: Contains components related to the navigation bar.
- recommendation: Contains components related to product recommendations.
- Highlight.js: Manages the rotating highlight banners on the home page.
- product: Contains components related to product listing and details.
- Footer.js: Defines the footer component for the app.


## src/components/navbar

- contains components related to Navbar ---

- NavItems: Contains various navigation items like Cart, Auth, and Search.
- Location.js: Manages the location component in the navigation bar.
- DesktopMenu.js: Manages the desktop menu component.
- MobileMenu.js: Manages the mobile menu component.
- Navbar.js : Display all the Navbar Components based on Viewport size.


## src/components/recommendation

- Recommendation.js: Manages the product recommendation component.
- RecomCategories.js: Defines and provides the categories and images for product recommendations.

## src/context

- AuthProvider.js: Provides authentication context for the app.
- useAuthentication.js: Manages user authentication context.
- cart-wish-CountProvider.js: Provides context for cart and wishlist counts.
- useCount.js: Managescart and wishlist items count.

## src/utils

- UserSavedData.js: Manages user saved data using Appwrite.
- appwriteConfig.js: Configures the Appwrite client and database.
- fetchImages.js: Fetches images for product listings.
- authentication.js: Manages user authentication using Appwrite.


## .env.local / .env.example

Includes all the environment variables to connect to appwrite backend services.


## Setup 

1. clone repository.
2. Run `touch .env.local` in command line. See the `.env.example` file what env variables you need.
3. Run `pnpm start`to start the development server.


## Dependencies

The project relies on the following key dependencies:

- `next`: Framework for React applications.
- `react`: JavaScript library for building user interfaces.
- `tailwindcss`: Utility-first CSS framework.
- `appwrite`: Backend as a Service platform for user authentication and data storage.


## Configuration Files

The project includes configuration files for Tailwind CSS, ESLint, and Next.js, as well as a PostCSS configuration file.

## Additional Information

The project also includes various utility functions for user authentication, fetching product images, and managing cart and wishlist items.
For more detailed information, please refer to the individual code files and their respective comments.
