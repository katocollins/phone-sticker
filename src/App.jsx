import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import StickerGenerator from "./components/StickerGenerator";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/generator"
          element={
            user ? <StickerGenerator /> : <Navigate to="/signin" replace />
          }
        />
        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
