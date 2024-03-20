import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

// Functional component for OAuth
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle Google sign-in
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      // Send user data to the server for authentication
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      // Get response data from the server
      const data = await res.json();
      console.log(result);

      // Dispatch action to update user state in Redux
      dispatch(signInSuccess(data));

      // Navigate to the home page after successful sign-in
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };

  // Render JSX component
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-85"
    >
      Continue with Google
    </button>
  );
}
