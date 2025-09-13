# Food Mall App

A modern, responsive food ordering web application built with HTML, CSS, JavaScript, Bootstrap 5, jQuery, and Firebase.

## Features

- **User Authentication**: Sign up and login functionality
- **Food Categories**: Browse food items by categories
- **Menu**: View all available food items with images and descriptions
- **Shopping Cart**: Add/remove items and adjust quantities
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Cart updates in real-time
- **Checkout**: Simple checkout process

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- jQuery
- Firebase (Authentication and Realtime Database)
- Font Awesome (Icons)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Firebase account (for backend functionality)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/food-mall-app.git
   cd food-mall-app
   ```

2. **Set up Firebase**
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create a Realtime Database
   - Get your Firebase configuration

3. **Configure Firebase**
   - Open `js/app.js`
   - Replace the `firebaseConfig` object with your Firebase project's configuration:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       databaseURL: "YOUR_DATABASE_URL",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

4. **Run the Application**
   - Open `index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python (if installed)
     python -m http.server 8000
     # Then open http://localhost:8000 in your browser
     ```

## Project Structure

```
food-mall-app/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Custom styles
├── js/
│   └── app.js          # Main JavaScript file
├── images/             # Food item images
├── fonts/              # Custom fonts (if any)
└── README.md           # Project documentation
```

## Features in Detail

### 1. User Authentication
- Secure sign up and login with email/password
- Form validation
- Protected routes (in a full implementation)

### 2. Food Categories
- Browse food items by categories (Breakfast, Lunch, Dinner, etc.)
- Responsive grid layout
- Beautiful category cards with images

### 3. Menu
- Display all available food items
- Filter by category
- Search functionality (can be implemented)
- Food details with images, descriptions, and prices

### 4. Shopping Cart
- Add/remove items
- Adjust quantities
- Real-time cart updates
- Calculate total price
- Persist cart data in localStorage

### 5. Checkout
- Simple checkout process
- Order summary
- Payment integration (can be implemented)
- Order confirmation

## Customization

### Adding New Food Items
To add new food items, update the `menuItems` array in `js/app.js`:

```javascript
const menuItems = [
    {
        id: 10, // Unique ID
        categoryId: 1, // Category ID (1: Breakfast, 2: Lunch, etc.)
        name: "New Item Name",
        description: "Item description",
        price: 9.99,
        image: "path/to/image.jpg"
    },
    // Add more items as needed
];
```

### Styling
- Customize colors, fonts, and spacing in `css/style.css`
- The app uses Bootstrap 5 utility classes for responsive design
- Custom animations and transitions are included

## Deployment

### Firebase Hosting (Recommended)
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login to Firebase:
   ```bash
   firebase login
   ```
3. Initialize Firebase project:
   ```bash
   firebase init
   ```
4. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```

### Other Hosting Options
You can also deploy to:
- Netlify
- Vercel
- GitHub Pages
- Any static web hosting service

## Future Enhancements

- User profiles and order history
- Search functionality
- Filtering and sorting options
- Ratings and reviews
- Multiple payment gateways
- Admin dashboard
- Push notifications
- Offline support with service workers

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Bootstrap 5](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [Firebase](https://firebase.google.com/)
- [Font Awesome](https://fontawesome.com/)
- [Unsplash](https://unsplash.com/) for food images

---

**Note**: This is a frontend demo. For a production application, you would need to implement proper security rules, server-side validation, and a backend API.
