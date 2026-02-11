import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";

const SHEET_URL = "https://script.google.com/a/macros/nst.rishihood.edu.in/s/AKfycbx_wqsVPKU2QMrdFOeOYzkUoDnTG-hnYaF1YKIzY4p-TrRw69IsbStpl1dKfPDXqFlX/exec";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [loading, setLoading] = useState(false);

  // 🔥 Send data to Google Sheets
  const logToSheets = async (type: string) => {
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        body: JSON.stringify({
          email,
          type,
          timestamp: new Date().toISOString()
        })
      });
    } catch {
      console.log("Sheets logging failed (ignored)");
    }
  };

  const redirectHome = () => {
    window.location.href = "/home"; // change if needed
  };

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await sendEmailVerification(userCred.user);

        await logToSheets("signup");

        alert("Verification email sent. Verify and login.");
      } else {
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        await userCred.user.reload();

        if (!userCred.user.emailVerified) {
          alert("Please verify your email first");
          return;
        }

        await logToSheets("login");

        alert("Login successful 🎉");

        redirectHome();
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Log In"}
        </h1>

        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 border rounded-xl mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          className="w-full px-4 py-3 border rounded-xl mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isSignup && (
          <button
            onClick={handleForgotPassword}
            className="text-sm text-green-600 mb-4 hover:underline"
          >
            Forgot password?
          </button>
        )}

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Please wait..." : isSignup ? "Sign Up" : "Log In"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-500">
          {isSignup ? "Already have an account?" : "New here?"}
          <button
            className="ml-2 text-green-600 font-semibold"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;
