# Phone Sticker App - React + Firebase Authentication

This is a simple React web application for generating phone stickers with barcodes and QR codes. It includes authentication features using Firebase Authentication.

## Features
- User Registration and Login (Firebase Authentication)
- QR Code and Barcode Generation
- PDF Export and Storage (Firebase Storage)

## Tech Stack
- **Frontend:** React, Vite, Bootstrap (for UI styling)
- **Authentication:** Firebase Authentication (Email/Password)
- **Storage:** Firebase Storage (for saving PDFs)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/phone-sticker-app.git
cd phone-sticker-app
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Firebase
- Create a **Firebase Project** at [Firebase Console](https://console.firebase.google.com/)
- Enable **Email/Password Authentication**
- Copy Firebase configuration details
- Create a `firebase-config.js` file inside `src/` and add the following:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
```

### 4. Start the Development Server
```sh
npm run dev
```
The app will be available at **http://localhost:5173/**.

## Next Steps
- Implement Registration and Login pages using Firebase Authentication.
- Generate and display QR codes and barcodes.
- Implement PDF generation and upload to Firebase Storage.

## License
This project is open-source and available under the MIT License.

